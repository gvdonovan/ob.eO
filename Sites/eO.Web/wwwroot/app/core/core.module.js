(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate',
            'ngSanitize',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'blocks.forms',
            'blocks.messanger',
            'ui.router',
            'ui.bootstrap',
            'duScroll'
            //, 'ngplus'
        ]);
})();
