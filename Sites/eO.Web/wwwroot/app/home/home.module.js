(function () {
    'use strict';

    angular
        .module('app.home', ['LocalStorageModule', 'app.core'])        
        .constant('ngAuthSettings', {
            apiServiceBaseUri: 'http://localhost:26264/',
            clientId: 'ngAuthApp'})
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        })
        .run(['authService', function (authService){
             authService.fillAuthData();
        }]);
})();
