(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('accountController', AccountController);

    AccountController.$inject = ['logger','$stateParams', 'accountService'];
    /* @ngInject */
    function AccountController(logger, $stateParams, accountService) {
        var vm = this;
        vm.title = 'Add Account';
        vm.account = new Account();
        vm.accountId = $stateParams.id;

        activate();

        function activate() {
            logger.info('Activated Account View');

            if(vm.accountId) {
                vm.title = 'Edit Account';

                accountService.getTransformedAccount().then(function (data) {
                    vm.account = data;
                    vm.account.validate();
                    console.warn(data);

                    console.log(vm.account.getMinLength('name'));
                    console.log(vm.account.getMaxLength('name'));
                    console.log(vm.account.isRequired('name'));
                });
            }
        }
    }
})();
