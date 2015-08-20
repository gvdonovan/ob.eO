(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('accountsController', AccountsController);

    AccountsController.$inject = ['logger','$state', 'routerHelper', 'accountService'];
    /* @ngInject */
    function AccountsController(logger, $state, routerHelper, accountService) {
        var vm = this;
        vm.title = 'Account List';
        vm.accounts = [];
        vm.createNewAccount = createNewAccount;
        vm.editAccount = editAccount;

        activate();

        function activate() {
            logger.info('Activated Accounts View');

            accountService.getAccounts().then(function(data){
                vm.accounts = data;
                console.warn(data);
            });
        }

        function createNewAccount(){
            $state.go('account');
        }

        function editAccount(){
            $state.go('account', {id: 1});
        }
    }
})();
