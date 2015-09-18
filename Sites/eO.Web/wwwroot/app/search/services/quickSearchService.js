(function () {
    'use strict';

    angular
        .module('app.search')
        .factory('quickSearchService', QuickSearchService);

    QuickSearchService.$inject = ['$q', 'logger', '$http'];

    function QuickSearchService($q, logger, $http) {
        var service = {
            getFormConfig: getFormConfig,
            getResults: getResults
        };

        var quickSearchFormConfig = null;

        return service;

        function httpExample() {
            return $http.post('/someUrl', { msg: 'hello word!' })
                 .then(function (response) {
                     // this callback will be called asynchronously
                     // when the response is available
                 }, function (response) {
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 });
        }


        function getFormConfig(entityId, userId, formId) {
            var deferred = $q.defer();
            if (quickSearchFormConfig == null) {
                quickSearchFormConfig = init(entityId, userId, formId);
            }
            deferred.resolve(quickSearchFormConfig);
            return deferred.promise;
        }

        function getResults(criteria) {
            var deferred = $q.defer();
            if (criteria !== null) {
                var data = getMockedResults();
                deferred.resolve(data);
            }
            else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        function getMockedResults() {
            var results = [
                {
                    title: 'Conforming 30 Yr Fixed',
                    items: [
                        {
                            rate: 3.875,
                            discPoints: 1875.00,
                            apr: 3.996,
                            months: 360,
                            payment: 1411.00,
                            closingCost: 4675.00,
                            rebate: 0.00
                        },
                        {
                            rate: 4,
                            discPoints: 1700.00,
                            apr: 3.999,
                            months: 360,
                            payment: 1511.00,
                            closingCost: 3075.00,
                            rebate: 10.00
                        },
                        {
                            rate: 4.2,
                            discPoints: 1500.00,
                            apr: 4.100,
                            months: 360,
                            payment: 1611.00,
                            closingCost: 500.00,
                            rebate: 500.00
                        }
                    ]
                },
                {
                    title: 'Conforming 15 Yr Fixed',
                    items: [
                        {
                            rate: 3.875,
                            discPoints: 1875.00,
                            apr: 3.996,
                            months: 360,
                            payment: 1411.00,
                            closingCost: 4675.00,
                            rebate: 90.00
                        },
                        {
                            rate: 4,
                            discPoints: 1700.00,
                            apr: 3.999,
                            months: 360,
                            payment: 1511.00,
                            closingCost: 3075.00,
                            rebate: 620.00
                        },
                        {
                            rate: 4.2,
                            discPoints: 1500.00,
                            apr: 4.100,
                            months: 360,
                            payment: 1611.00,
                            closingCost: 500.00,
                            rebate: 750.00
                        }
                    ]
                },
                {
                    title: 'Conforming 5/1 ARM',
                    items: [
                        {
                            rate: 3.875,
                            discPoints: 1875.00,
                            apr: 3.996,
                            months: 360,
                            payment: 1411.00,
                            closingCost: 4675.00,
                            rebate: 0.00
                        },
                        {
                            rate: 4,
                            discPoints: 1700.00,
                            apr: 3.999,
                            months: 360,
                            payment: 1511.00,
                            closingCost: 3075.00,
                            rebate: 10.00
                        },
                        {
                            rate: 4.2,
                            discPoints: 1500.00,
                            apr: 4.100,
                            months: 360,
                            payment: 1611.00,
                            closingCost: 500.00,
                            rebate: 875.00
                        }
                    ]
                }
            ];

            return results;
        }

        function init(entityId, userId, formId) {
            entityId = entityId ? entityId : 1
            userId = userId ? userId : 1
            formId = formId ? formId : 1

            var url = '//localhost:63312/api/config/search/Inputs/' + entityId + '/' + formId;
            return $http.get(url)
                .then(function (response) {

                    //if purchase
                    var purchasePrice = _.findWhere(response.data.fields, { key: 'PurchasePrice' });
                    purchasePrice['hideExpression'] = "model.LoanPurpose === '2' || model.LoanPurpose === '3'";
                    var downPayment = _.findWhere(response.data.fields, { key: 'DownPayment' });
                    downPayment['hideExpression'] = "model.LoanPurpose === '2' || model.LoanPurpose === '3'";

                    //if not purchase
                    var loanAmount = _.findWhere(response.data.fields, { key: 'LoanAmount' });
                    loanAmount['expressionProperties'] = {
                        'hide': function ($viewValue, $modelValue, scope) {
                            return scope.model.LoanPurpose === '1' || !scope.model.LoanPurpose
                        }
                    };
                    var estimatedValue = _.findWhere(response.data.fields, { key: 'EstimatedValue' });
                    estimatedValue['expressionProperties'] = {
                        'hide': function ($viewValue, $modelValue, scope) {
                            return scope.model.LoanPurpose === '1' || !scope.model.LoanPurpose
                        }
                    };

                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }
    }
})();