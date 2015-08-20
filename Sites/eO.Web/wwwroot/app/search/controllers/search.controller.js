(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$stateParams', '$q', 'logger', '$timeout', 'quickSearchService', '$window'];
    /* @ngInject */
    function SearchController($rootScope, $stateParams, $q, logger, $timeout, quickSearch, $window) {

        var vm = this;
        if ($stateParams.embedded === 'true') {
            $rootScope.hideChrome = true;
        } else {
            $rootScope.hideChrome = false;
        }

        //$rootScope.hideChrome = $stateParams.embedded;
        vm.title = 'Quick Search';
        vm.submit = submit;
        vm.isLoading = false;
        vm.showJson = false;
        vm.json = "";
        vm.searchResults = [];
        vm.underScoreJson = "";
        vm.formModel = {};
        vm.formFields = [];

        activate();

        function activate() {
            logger.info('Activated search View', $stateParams.embedded);


            var biff = JSON.stringify({ "FormData": { "foo": "bar", "foo2": "bar2" } });

            if ($stateParams.mode == 'results') {

                //TODO DH: extract query string parameters into "biff"
                //TODO JA: update vm.formModel using "biff"

                $q.all([
                    quickSearch.getFormConfig(),
                    quickSearch.getResults(vm.formModel)
                ]).then(function (data) {
                    vm.data = data[0];
                    vm.formFields = data[0].fields;

                    vm.searchResults = data[1];
                    vm.json = JSON.stringify(vm.formModel, null, 4);

                    

                    vm.showJson = true;
                    vm.underScoreJson = underScoreFilter();

                    //TODO JA: Bind variables from "biff"

                })
            }
            else {
                quickSearch.getFormConfig().then(function (data) {
                    vm.data = data;
                    vm.formFields = data.fields;
                });
            }
        }

        function submit() {

            // Widget example, go to results view in new page
            if (inIframe) {
                var x = window.top.location.assign(iframeArgs.quoteUrl);
                x.postMessage("Biff", "http:biff.org");
                console.log(x.location);
            } else {
                vm.isLoading = true;
                return quickSearch.getResults(vm.formModel).then(function (data) {
                    vm.searchResults = data;
                    vm.json = JSON.stringify(vm.formModel, null, 4);
                    vm.showJson = true;
                    vm.underScoreJson = underScoreFilter();
                    $timeout(function () {
                        vm.isLoading = false;
                    }, 500);
                });
            }
        }

        function underScoreFilter() {
            var biff = _.pluck(vm.searchResults, 'items');
            var flat = _.flatten(biff);
            var x = _.filter(flat, function (item) {
                return item.rebate >= 500;
            });
            return x;
        }
    }
})();