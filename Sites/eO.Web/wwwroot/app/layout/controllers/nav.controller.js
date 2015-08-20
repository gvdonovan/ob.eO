(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('NavController', NavController);

    NavController.$inject = ['$rootScope', '$timeout', 'config', 'logger', '$state', 'routerHelper'];
    /* @ngInject */
    function NavController($rootScope, $timeout, config, logger, $state, routerHelper) {
        var vm = this;
        var states = routerHelper.getStates();

        activate();

        function activate() {
            getNavRoutes();
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function(r) {
                return r.settings && r.settings.nav && r.settings.top;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }


    }
})();
