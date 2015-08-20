(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiTabsController', ObuiTabsController);
  
    ObuiTabsController.$inject = ['$window'];
      
    // Tabs
    /* @ngInject */
    function ObuiTabsController($window) {
      
        var vm = this;  
      
        vm.tabs = [
          { title:'Dynamic Title 1', content:'Dynamic content 1' },
          { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
        ];

        vm.alertMe = function() {
          setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
          });
        };
      
    }
    
  
})();