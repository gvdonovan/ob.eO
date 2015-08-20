(function () {
    'use strict';

    angular
        .module('app.results')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'results',
                config: {
                    url: '/results?embedded',
                    templateUrl: 'app/results/views/results.html',
                    controller: 'ResultsController',
                    controllerAs: 'vm',
                    title: 'Results',
                    settings: {
                        group: 'Results',
                        top: false,
                        nav: 4,
                        content: '<i class="fa fa-bars"></i> Results'
                    }
                }
            }
        ];
        return states;
    }
})();