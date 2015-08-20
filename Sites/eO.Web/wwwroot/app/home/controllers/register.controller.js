(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('registerController', RegisterController);

    RegisterController.$inject = ['$location', '$timeout', 'authService', 'logger'];
    /* @ngInject */
    function RegisterController($location, $timeout, authService, logger) {
        var vm = this;
        vm.title = 'Register';
        vm.savedSuccessfully = false;
        vm.message = '';
        vm.registrationData = {
            userName: '',
            password: '',
            confirmationPassword: '',
            useRefreshTokens: false
        };
        vm.register = register;

        activate();

        function activate() {
            logger.info('Activated Register View');
        }

        function register() {

            goToLogin();
            //authService.saveRegistration($scope.registration).then(
            //function (response) {
            //    vm.savedSuccessfully = true;
            //    vm.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            //        goToLogin();
            //},
            //function (response) {
            //    var errors = [];
            //    for (var key in response.data.modelState) {
            //        for (var i = 0; i < response.data.modelState[key].length; i++) {
            //            errors.push(response.data.modelState[key][i]);
            //        }
            //    }
            //    vm.message = "Failed to register user due to:" + errors.join(' ');
            //});
        }

        function goToLogin() {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        }
    }
})();
