(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiModalController', ObuiModalController);
  
    ObuiModalController.$inject = ['$modal'];
      
    // Modal
    /* @ngInject */
    function ObuiModalController($modal) {
      
        var vm = this;  
      
        vm.items = ['item1', 'item2', 'item3'];

        vm.animationsEnabled = true;

        vm.open = function (size) {

          var modalInstance = $modal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl as vm',
            size: size,
            resolve: {
              items: function () {
                return vm.items;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            vm.selected = selectedItem;
          }, function () {
            // $log.info('Modal dismissed at: ' + new Date());
          });
        };

        vm.toggleAnimation = function () {
          vm.animationsEnabled = !vm.animationsEnabled;
        };

      }

      // Please note that $modalInstance represents a modal window (instance) dependency.
      // It is not the same as the $modal service used above.

      angular.module('app.obui').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
        
        var vm = this;

        vm.items = items;
        vm.selected = {
          item: vm.items[0]
        };

        vm.ok = function () {
          $modalInstance.close(vm.selected.item);
        };

        vm.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      });     
    
  
})();