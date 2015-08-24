﻿(function () {
    'use strict';

    angular
        .module('blocks.messenger')
        .service('messenger', messenger);

    messenger.$inject = ['$window', '$rootScope', '$q'];

    /* @ngInject */
    function messenger($window, $rootScope, $q) {

        var initialized = false;

        var service = {
            init: init,
            searchIsReady: searchIsReady,
            send: send
        };

        return service;

        function init() {

            if (!initialized) {
                messageListener();
                initialized = true;
            }

            angular.element(document).ready(function () {
                send('OBWidgetInit', null);
            });

            $rootScope.$on('obWidgetContract', function (ev, args) {
                createCssLink(args.cssUrl);
            });
        }

        function searchIsReady() {

            var deferred = $q.defer();
            send('searchResultsInit', null);

            $rootScope.$on('searchData', function (ev, args) {
                deferred.resolve(args);
            });
            return deferred.promise;
        }

        function send(type, data) {
            var m = {
                eventType: type,
                bag: data
            };
            var message = JSON.stringify(m);
            $window.parent.postMessage(message, '*');
        }

        /*
         * Establish hand-shake service
         */        
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

        function createCssLink(urlStr) {
            var cssLink = document.createElement("link");
            cssLink.href = urlStr;
            cssLink.rel = "stylesheet";
            cssLink.type = "text/css";
            document.head.appendChild(cssLink);
        }
    }
}());
