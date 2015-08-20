(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiPaginationController', ObuiPaginationController);
  
    ObuiPaginationController.$inject = [];
      
    // Pagination
    /* @ngInject */
    function ObuiPaginationController() {
      
        var vm = this;  
      
        vm.totalItems = 64;
        vm.currentPage = 4;

        vm.setPage = function (pageNo) {
          vm.currentPage = pageNo;
        };

        vm.pageChanged = function() {
          // $log.log('Page changed to: ' + vm.currentPage);
        };

        vm.maxSize = 5;
        vm.bigTotalItems = 175;
        vm.bigCurrentPage = 1;
      
    }
    
  
})();