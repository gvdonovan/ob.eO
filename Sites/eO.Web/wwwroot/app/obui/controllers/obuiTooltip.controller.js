(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiTooltipController', ObuiTooltipController);
  
    ObuiTooltipController.$inject = ['$sce'];
      
    // Tooltip
    /* @ngInject */
    function ObuiTooltipController($sce) {
      
        var vm = this;  
      
        vm.dynamicTooltip = 'Hello, World!';
        vm.dynamicTooltipText = 'dynamic';
        vm.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');
      
    }
    
  
})();