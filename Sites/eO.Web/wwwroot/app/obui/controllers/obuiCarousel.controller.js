(function () {
    'use strict';

    angular
        .module('app.obui')
        .controller('obuiCarouselController', ObuiCarouselController);
  
    ObuiCarouselController.$inject = ['$scope', '$animate'];
      
    // Carousel
    /* @ngInject */
    function ObuiCarouselController($scope, $animate) {
      
      /*
        var vm = this;  
      
        vm.myInterval = 500;
        vm.noWrapSlides = false;
        vm.slides = [];
        vm.addSlide = function() {
          var newWidth = 600 + vm.slides.length + 1;
          vm.slides.push({
            image: '//placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][vm.slides.length % 4] + ' ' +
              ['Cats', 'Kittys', 'Felines', 'Cutes'][vm.slides.length % 4]
          });
        };
        for (var i=0; i<4; i++) {
          vm.addSlide();
        }
      */
      
      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      var slides = $scope.slides = [];
      $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
          image: '//placekitten.com/' + newWidth + '/300',
          text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
            ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
      };
      for (var i=0; i<4; i++) {
        $scope.addSlide();
      }
  
      // This fixes the bug in the carousel but disables all animations in this setion of the site so I'm leaving it commented out for now.
      
      // $animate.enabled(false);
      
    }
  
    
  
    
  
})();