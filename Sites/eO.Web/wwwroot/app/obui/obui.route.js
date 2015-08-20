(function () {
    'use strict';

    angular
        .module('app.obui')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'obui',
                config: {
                    url: '/obui',
                    templateUrl: 'app/obui/views/obui.html',
                    controller: 'obuiController',
                    controllerAs: 'vm',
                    title: 'OBUI',
                    settings: {
                        group: 'Obui',
                        top: false,
                        nav: 4,
                        content: '<i class="fa fa-cogs"></i> OB UI'
                    }
                }
            }
        ];
        return states;
    }
})();
