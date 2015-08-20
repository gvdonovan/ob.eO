(function () {
    'use strict';

    angular
        .module('app.results')
        .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['$rootScope', '$stateParams', 'logger', '$timeout', 'resultsService'];
    /* @ngInject */
    function ResultsController($rootScope, $stateParams,logger, $timeout, resultsService) {
        var vm = this;
        $rootScope.hideChrome = $stateParams.embedded;
        vm.title = 'Results';
        vm.submit = submit;
        vm.isLoading = false;
        vm.showJson = false;
        vm.json = "";
        vm.searchResults = [];
        vm.underScoreJson = "";
        vm.formModel = {};
        vm.formFields = [];

        activate();
        submit();

        function activate() {
            logger.info('Activated results View');

            resultsService.getFormConfig().then(function (data) {
                vm.data = data;
                vm.formFields = data.fields;
            });
        }

        function submit() {
            vm.isLoading = true;
            return resultsService.getResults(vm.formModel).then(function (data) {
                vm.searchResults = data;
                vm.json = JSON.stringify(vm.formModel, null, 4);
                vm.showJson = true;
                vm.underScoreJson = underScoreFilter();
                $timeout(function () {
                    vm.isLoading = false;
                }, 500);
            });
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