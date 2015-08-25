(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$stateParams', '$q', 'logger', 'quickSearchService', 'messenger'];
    /* @ngInject */
    function SearchController($rootScope, $stateParams, $q, logger, quickSearch, messenger) {
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
        vm.plainFormFields = [
                    {
                        key: 'occupancy',
                        type: 'plainselect',
                        defaultValue: 'owner_occupied',
                        templateOptions: {
                            label: 'Occupancy',
                            options: [
                                {
                                    label: 'Owner Occupied',
                                    value: 'owner_occupied'
                                },
                                {
                                    label: 'Other',
                                    value: 'other'
                                },
                                {
                                    label: 'Biff',
                                    value: 'biff'
                                },
                            ],
                        }
                    },
                    {
                        key: 'propertyType',
                        type: 'plainselect',
                        templateOptions: {
                            label: 'Property Type',
                            options: [
                                {
                                    label: 'Single Family',
                                    value: 'single_family'
                                },
                                {
                                    label: 'PUD',
                                    value: 'pud'
                                },
                                {
                                    label: 'Multi-Family',
                                    value: 'multi_family'
                                },
                                {
                                    label: 'Manufactured / Single Wide',
                                    value: 'manufactured_single_wide'
                                },
                                {
                                    label: 'Manufactured / Double Wide',
                                    value: 'manufactured_double_wide'
                                },
                                {
                                    label: 'Timeshare',
                                    value: 'timeshare'
                                },
                                {
                                    label: 'Condotel',
                                    value: 'condotel'
                                },
                                {
                                    label: 'Non-warrantable Condo',
                                    value: 'non_warrantable_condo'
                                },
                                {
                                    label: 'Modular',
                                    value: 'modular'
                                },
                            ],
                            required: false
                        }
                    },
                    {
                        key: 'loanPurpose',
                        type: 'plaininput',
                        templateOptions: {
                            label: 'Loan Purpose',
                            type: 'text',
                            required: false
                        }
                    },
                    {
                        key: 'purchasePrice',
                        type: 'plaininput',
                        templateOptions: {
                            label: 'Purchase Price',
                            type: 'number',
                            placeholder: '0.00',
                            required: false
                        }
                    },
                    {
                        key: 'downPayment',
                        type: 'plaininput',
                        templateOptions: {
                            label: 'Down Payment',
                            type: 'number',
                            placeholder: '0.00',
                            required: false
                        }
                    },
                    {
                        key: 'zip',
                        type: 'plaininput',
                        templateOptions: {
                            label: 'Zip',
                            type: 'text',
                            required: false
                        }
                    },
                    {
                        key: 'creditScore',
                        type: 'plaininput',
                        templateOptions: {
                            label: 'Credit Score',
                            type: 'text',
                            required: false
                        }
                    }
        ];

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
                messenger.send('searchSubmitted', vm.formModel);
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

                rebuildModel(data);
                $q.all([
                    quickSearch.getFormConfig(),
                    quickSearch.getResults(vm.formModel)
                ]).then(function (data) {
                    vm.data = data[0];
                    vm.formFields = data[0].fields;
                    vm.searchResults = data[1];
                });
            });
        }

        function getSearchForm() {
            return quickSearch.getFormConfig().then(function (data) {
                vm.data = data;
                vm.formFields = data.fields;
            });
        }

        function rebuildModel(bag) {
            for (var x in bag) {
                vm.formModel[x] = bag[x];
            }
        }
    }
})();