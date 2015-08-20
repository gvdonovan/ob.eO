(function () {
    'use strict';

    angular
        .module('app.loanApplication')
        .controller('applicationController', ApplicationController);

    ApplicationController.$inject = ['logger', '$state', '$scope', 'loanApplicationService'];
    /* @ngInject */
    function ApplicationController(logger, $state, $scope, loanService) {
        var vm = this;
        vm.title = '1003 Loan App';
        vm.activeStep = '';
        vm.loanFormConfig = {};
        vm.loanFormModel = {};

        vm.steps = ['start', 'personal', 'property', 'income', 'assets', 'expenses', 'additional', 'select', 'submit'];
        vm.step = 0;
        vm.nextStep = nextStep;
        vm.previousStep = previousStep;
        vm.finish = finish;
        vm.isLastStep = false;
        vm.isFirstStep = true;

        activate();

        function activate() {
            logger.info('Activated Application View');
            loanService.getLoanForm().then(function(data){
               vm.loanFormConfig = data;
            });
            vm.activeStep = getCurrentStep();
            goStep();
        }

        function getCurrentStep() {
            return vm.steps[vm.step];
        }

        function goStep() {
            vm.step = (vm.step > (vm.steps.length - 1)) ? vm.steps.length - 1 : vm.step;
            vm.step = (vm.step < 0 ) ? 0 : vm.step;
            $state.go('loanApplication.' + getCurrentStep());
            vm.activeState = getCurrentStep();
        }

        function nextStep(steps) {
            vm.step += (steps == undefined || steps == null) ? 1 : steps;
            goStep();
        }

        function previousStep(steps) {
            vm.step -= (steps == undefined || steps == null) ? 1 : steps;
            goStep();
        }

        function finish(){
            console.log('Finish was clicked');
        }

        $scope.$watch(angular.bind(vm, function (obj) {
            return obj.vm.step;
        }), function (newVal) {
            vm.isLastStep = (newVal == (vm.steps.length - 1));
            vm.isFirstStep = (newVal == 0);
        });
    }
})();
