(function () {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/home/views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    title: 'E-Originations',
                    settings: {
                        group: 'home',
                        top: true,
                        nav: 2,
                        content: '<i class="fa fa-home"></i> E-Originations'
                    }
                },
                
            },
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/home/views/login.html',
                    controller: 'loginController',
                    controllerAs: 'vm',
                    title: 'Login',
                    settings: {
                        group: 'home',
                        top: false,
                        nav: 99,
                        content: '<i class="fa fa-sign-in"></i> Login'
                    }
                }
            },
            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: 'app/home/views/register.html',
                    controller: 'registerController',
                    controllerAs: 'vm',
                    title: 'Register',
                    settings: {
                        group: 'home',
                        top: false,
                        nav: 99
                    }
                }
            }
        ];

        return states;
    }
})();
