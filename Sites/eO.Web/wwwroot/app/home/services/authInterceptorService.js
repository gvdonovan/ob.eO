(function () {

    'use strict';
    angular
        .module('app.home')
        .factory('authInterceptorService',  AuthInterceptorService);

    AuthInterceptorService.$inject = ['$q', '$injector', '$location', 'localStorageService'];
            
    function AuthInterceptorService($q, $injector, $location, localStorageService) {
        
        var service = {
            request: request,
            responseError: responseError
        };
        
        return service;
        
        function request (config) {
            config.headers = config.headers || {};           
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }    
            return config;
        }

        function responseError (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                var authData = localStorageService.get('authorizationData');    
                if (authData) {
                    if (authData.useRefreshTokens) {
                        $location.path('/refresh');
                        return $q.reject(rejection);
                    }
                }
                authService.logOut();
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    }
})();