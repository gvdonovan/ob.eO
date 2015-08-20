(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['logger', '$state', 'routerHelper'];
    /* @ngInject */
    function HomeController(logger, $state, routerHelper) {
        var vm = this;       
        vm.title = 'Home';
        activate();

        function activate() {
            logger.info('Activated Home View');            
        }
    }
})();
