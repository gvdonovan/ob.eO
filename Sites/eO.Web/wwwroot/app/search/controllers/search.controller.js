(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$stateParams', 'logger', 'quickSearchService', 'messenger'];
    /* @ngInject */
    function SearchController($rootScope, $stateParams, logger, quickSearch, messenger) {
        var vm = this;

        vm.embedded = false;
        if ($stateParams.embedded === 'true') {
            $rootScope.hideChrome = true;
            vm.embedded = true;
        } else {
            $rootScope.hideChrome = false;
        }

        vm.apply = apply;
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
            if (vm.embedded && $stateParams.mode != 'results') {
                messenger.send('searchSubmitted', vm.formModel);
            }
            else {
                vm.isLoading = true;
                return quickSearch.getResults(vm.formModel).then(function (data) {
                    vm.searchResults = data;
                    vm.isLoading = false;
                });
            }
        }

        //gets form config and results
        function searchAndResults() {
            return messenger.searchIsReady().then(function (data) {
                var bag = data;
                quickSearch.getFormConfig($stateParams.entityId, $stateParams.userId, $stateParams.formId).then(function (data) {
                    vm.data = data;
                    vm.formFields = data.fields;
                    rebuildModel(bag);
                    quickSearch.getResults(vm.formModel).then(function (data) {
                        vm.searchResults = data;
                    });
                });
            });
        }

        //gets form config
        function getSearchForm() {
            return quickSearch.getFormConfig($stateParams.entityId, $stateParams.userId, $stateParams.formId).then(function (data) {
                vm.data = data;
                vm.formFields = data.fields;
            });
        }

        // builds form model from query string; used when embedded
        function rebuildModel(bag) {
            for (var x in bag) {
                var field = _.findWhere(vm.formFields, { key: x });
                if (!_.isUndefined(field.templateOptions.type) && field.templateOptions.type.toLowerCase() == 'number') {
                    vm.formModel[x] = Number(bag[x]);
                }
                else {
                    vm.formModel[x] = bag[x];
                }
            }
        }

        function apply() {
            window.open('//localhost:51639/api/loan/show/1/2/3');
        }
    }
})();