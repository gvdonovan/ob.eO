(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$location', 'authService', 'logger'];
    /* @ngInject */
    function LoginController($location, authService, logger) {
        var vm = this;       
        vm.title = 'Login';
		vm.message = '';
		vm.loginData = {
			userName: '',
        	password: '',
        	useRefreshTokens: false
		};
		vm.login = login;
		vm.goToRegisterPage = goToRegisterPage;
		
        activate();

        function activate() {
            logger.info('Activated Home View');						            
        }
		
		function login() {
			authService.login(vm.loginData).then(function(response){
				$location.path('/admin');
			},
			function(error) {
				vm.message = error.error_description;
			});
		}

		function goToRegisterPage(){
			$location.path('/register');
		}
    }	
})();
