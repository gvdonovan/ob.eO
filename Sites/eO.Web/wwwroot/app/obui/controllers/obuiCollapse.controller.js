(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiCollapseController', ObuiCollapseController);

    ObuiCollapseController.$inject = [];
      
    // Collapse
    /* @ngInject */
    function ObuiCollapseController() {
      
        var vm = this;  
      
        vm.isCollapsed = false;
      
    }
  
})();