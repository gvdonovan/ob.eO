(function () {
    'use strict';

    angular
        .module('app.search')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'search',
                config: {
                    url: '/search?embedded&mode&entityId&userId&formId',
                    templateUrl: 'app/search/views/search.html',
                    controller: 'SearchController',
                    controllerAs: 'vm',
                    title: 'Search',
                    settings: {
                        group: 'Search',
                        top: true,
                        nav: 2,
                        content: '<i class="fa fa-search"></i> Search'
                    }
                }
            }
        ];
        return states;
    }
})();
