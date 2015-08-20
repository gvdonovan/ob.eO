(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiPopoverController', ObuiPopoverController);
  
    ObuiPopoverController.$inject = [];
      
    // Popover
    /* @ngInject */
    function ObuiPopoverController() {
      
        var vm = this;  
      
        vm.dynamicPopover = {
          content: 'Hello, World!',
          templateUrl: 'myPopoverTemplate.html',
          title: 'Title'
        };
      
    }
    
  
})();