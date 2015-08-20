(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiController', ObuiController)
        .controller('obuiAccordionController', ObuiAccordionController);

    ObuiController.$inject = ['logger','$state', 'routerHelper'];
  
    ObuiAccordionController.$inject = ['$scope'];
    
    /* @ngInject */
    function ObuiController(logger, $state, routerHelper) {
        var vm = this;
        vm.title = 'OBUI';
        vm.desc = 'Using Angular-UI Bootstrap.'; 

        activate();

        function activate() {
            logger.info('Activated OB UI View');

            // do UI stuff
        }
      
    }
    
    /*
      Bootstrap UI Directive Controllers
    */

    // Accordion
    /* @ngInject */
    function ObuiAccordionController($scope) {
      
        $scope.oneAtATime = true;

        $scope.groups = [
          {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
          },
          {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
          }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
          var newItemNo = $scope.items.length + 1;
          $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
          isFirstOpen: true,
          isFirstDisabled: false
        };
      
        // Alert          
      
    }
  
    // 
  
  
})();
