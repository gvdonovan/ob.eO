(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiAlertController', ObuiAlertController);
  
    ObuiAlertController.$inject = [];
      
    // Alert
    /* @ngInject */
    function ObuiAlertController() {
      
        var vm = this;  
      
        vm.alerts = [
          { 
            type: 'danger', 
            msg: 'Oh snap! Change a few things up and try submitting again.' 
          },
          { 
            type: 'success',
            msg: 'Well done! You successfully read this important alert message.' 
          }
        ];

        vm.addAlert = function() {
          vm.alerts.push({msg: 'Another alert!'});
        };

        vm.closeAlert = function(index) {
          vm.alerts.splice(index, 1);
        };         
      
    }
  
})();