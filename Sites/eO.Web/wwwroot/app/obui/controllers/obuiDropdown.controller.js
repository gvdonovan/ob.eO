(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiDropdownController', ObuiDropdownController);
  
    ObuiDropdownController.$inject = [];
      
    // Dropdown
    /* @ngInject */
    function ObuiDropdownController() {
      
        var vm = this;  
      
        vm.items = [
          'The first choice!',
          'And another choice for you.',
          'but wait! A third!'
        ];

        vm.status = {
          isopen: false
        };

        vm.toggled = function(open) {
          // $log.log('Dropdown is now: ', open);
        };

        vm.toggleDropdown = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          vm.status.isopen = !vm.status.isopen;
        };
      
    }
  
})();