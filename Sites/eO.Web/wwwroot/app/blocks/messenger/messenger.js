(function () {
    'use strict';

    angular
        .module('blocks.messenger')
        .service('messenger', messenger);

    messenger.$inject = ['$window', '$rootScope', '$q'];

    /* @ngInject */
    function messenger($window, $rootScope, $q) {
        var service = {
            init: init,
            searchIsReady: searchIsReady
        };

        var initialized = false;

        return service;

        function init() {
            if (!initialized) {
                messageListener();
                initialized = true;
            }
        }

        function searchIsReady() {
            var deferred = $q.defer();
            var m = {
                eventType: 'searchResultsInit'
            };
            var message = JSON.stringify(m);
            window.parent.postMessage(message, '*');

            $rootScope.$on('searchData', function (ev, args) {
                deferred.resolve(args);
            });
            return deferred.promise;
        }

        /////////////////////
        function messageListener() {
            $window.addEventListener('message', function (event) {
                if (event.type === 'message') {
                    var message = null;
                    try {
                        message = JSON.parse(event.data);
                    }
                    catch (e) {
                        console.log('bad message request' + e);
                    }
                    if (message != null) {
                        $rootScope.$broadcast(message.eventType, message.bag);
                    }
                }
            });
        };
    }
}());
