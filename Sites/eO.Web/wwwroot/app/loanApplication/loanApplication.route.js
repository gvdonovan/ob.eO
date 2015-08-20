(function() {
    'use strict';

    angular
        .module('app.loanApplication')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'loanApplication',
                config: {
                    url: '/loanApplication',
                    templateUrl: 'app/loanApplication/views/application.html',
                    controller: 'applicationController',
                    controllerAs: 'vm',
                    title: '1003 Application',
                    settings: {
                        group: 'loanApplication',
                        top: true,
                        nav: 8,
                        content: '<i class="fa fa-file-text"></i> Loan Application'
                    }
                }
            },
            {
                state: 'loanApplication.start',
                config:{
                    url:'/start',
                    templateUrl:'app/loanApplication/views/partials/gettingStarted.html'
                }
            },
            {
                state: 'loanApplication.personal',
                config:{
                    url:'/personal',
                    templateUrl:'app/loanApplication/views/partials/personal.html'
                }
            },
            {
                state: 'loanApplication.property',
                config:{
                    url:'/property',
                    templateUrl:'app/loanApplication/views/partials/property.html'
                }
            },
            {
                state: 'loanApplication.income',
                config:{
                    url:'/income',
                    templateUrl:'app/loanApplication/views/partials/incomes.html'
                }
            },
            {
                state: 'loanApplication.assets',
                config:{
                    url:'/assets',
                    templateUrl:'app/loanApplication/views/partials/assets.html'
                }
            },
            {
                state: 'loanApplication.expenses',
                config:{
                    url:'/expenses',
                    templateUrl:'app/loanApplication/views/partials/expenses.html'
                }
            },
            {
                state: 'loanApplication.additional',
                config:{
                    url:'/additional',
                    templateUrl:'app/loanApplication/views/partials/additionalInfo.html'
                }
            },
            {
                state: 'loanApplication.select',
                config:{
                    url:'/select',
                    templateUrl:'app/loanApplication/views/partials/selectLoan.html'
                }
            },
            {
                state: 'loanApplication.submit',
                config:{
                    url:'/submit',
                    templateUrl:'app/loanApplication/views/partials/submit.html'
                }
            }
        ];

        return states;
    }
})();
