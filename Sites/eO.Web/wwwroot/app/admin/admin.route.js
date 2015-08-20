(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        var states = [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/views/admin.html',
                    controller: 'adminController',
                    controllerAs: 'vm',
                    title: 'Admin',
                    settings: {
                        group: 'admin',
                        top: true,
                        nav: 2,
                        content: '<i class="fa fa-wrench"></i> Admin'
                    }
                }
            }
        ];

        return states;
    }
})();
