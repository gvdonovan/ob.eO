(function () {
    'use strict';

    angular
        .module('blocks.messanger')
        .factory('messanger', messanger);

    messanger.$inject = ['$window', '$rootScope'];

    /* @ngInject */
    function messanger($window, $rootScope) {
        var service = {
            messageListener: messageListener
        };

        return service;
        /////////////////////
        function messageListener() {
            $window.addEventListener('message', function (event) {
                var message = JSON.parse(event);
                $rootScope.$broadcast(message.eventType, message.bag);
            });
        };
    }
}());
