(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$stateParams', '$q', 'logger', '$timeout', 'quickSearchService', '$window', 'messenger'];
    /* @ngInject */
    function SearchController($rootScope, $stateParams, $q, logger, $timeout, quickSearch, $window, messenger) {
        var vm = this;

        vm.embedded = false;
        if ($stateParams.embedded === 'true') {
            $rootScope.hideChrome = true;
            vm.embedded = true;
        } else {
            $rootScope.hideChrome = false;
        }

        vm.title = 'Quick Search';
        vm.submit = submit;
        vm.isLoading = false;
        vm.searchResults = [];
        vm.formModel = {};
        vm.formFields = [];

        activate();

        function activate() {
            logger.info('Activated search View', $stateParams.embedded);

            if ($stateParams.mode == 'results') {
                searchAndResults();
            }
            else {
                getSearchForm();
            }
        }

        function submit() {
            // if app is in iframe an event will be raised to parent container when submit is clicked.
            if (vm.embedded) {
                var m = {
                    eventType: 'searchSubmitted',
                    bag: vm.formModel
                };
                var message = JSON.stringify(m);
                window.parent.postMessage(message, '*');

            } else {
                vm.isLoading = true;
                return quickSearch.getResults(vm.formModel).then(function (data) {
                    vm.searchResults = data;
                    vm.isLoading = false;
                });
            }
        }

        function searchAndResults() {
            return messenger.searchIsReady().then(function (data) {
                vm.bag = data;
                console.log(vm.bag);


                $q.all([
                    quickSearch.getFormConfig(),
                    quickSearch.getResults(vm.formModel)
                ]).then(function (data) {
                    vm.data = data[0];
                    vm.formFields = data[0].fields;

                    vm.searchResults = data[1];
                    //TODO JA: Bind variables from "biff"

                });
            });
        }

        function getSearchForm() {
            return quickSearch.getFormConfig().then(function (data) {
                vm.data = data;
                vm.formFields = data.fields;
            });
        }
    }
})();