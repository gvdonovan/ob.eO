(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, forms, formlyConfig, messanger) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
        forms.datePickerConfig(formlyConfig);
        forms.borrowerAliasConfig(formlyConfig);
        messanger.messageListener();
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            }
        ];
    }
})();
