(function () {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, forms, formlyConfig, messenger, $rootScope) {
        var otherwise = '/404';
        $rootScope.useBootstrap = true;
        routerHelper.configureStates(getStates(), otherwise);
        forms.datePickerConfig(formlyConfig);
        forms.borrowerAliasConfig(formlyConfig);
        forms.plainInputsConfig(formlyConfig);
        messenger.init();
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
