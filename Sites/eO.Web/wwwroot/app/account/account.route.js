(function () {
    'use strict';

    angular
        .module('app.account')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'account',
                config: {
                    url: '/account',
                    params: {
                        id: null
                    },
                    templateUrl: 'app/account/views/account.html',
                    controller: 'accountController',
                    controllerAs: 'vm',
                    title: 'Account',
                    settings: {
                        group: 'Account',
                        top: false,
                        nav: 4,
                        content: '<i class="fa fa-search"></i> Account'
                    }
                }
            },
            {
                state: 'accounts',
                config: {
                    url: '/accounts',
                    templateUrl: 'app/account/views/accounts.html',
                    controller: 'accountsController',
                    controllerAs: 'vm',
                    title: 'Accounts',
                    settings: {
                        group: 'Accounts',
                        top: true,
                        nav: 5,
                        content: '<i class="fa fa-list"></i> Accounts'
                    }
                }
            }
        ];
        return states;
    }
})();
