(function () {
    'use strict';

    angular
        .module('app.account')
        .service('accountService', AccountService);

    AccountService.$inject = ['$q', 'logger'];

    function AccountService($q, logger) {
        var service = {
            getTransformedAccount: getTransformedAccount,
            getAccounts: getAccounts
        };

        return service;

        function getTransformedAccount(){
            var deferred = $q.defer();
            var data = getAccountInJson();

            var newAccount = new Account(data.name, data.phone, data.fax, data.site, data.address1, data.address2, data.city, data.zip);

            deferred.resolve(newAccount);
            return deferred.promise;
        }

        function getAccounts(){
            var deferred = $q.defer();
            var data = mockedAccounts();
            var accounts = [];

            _.each(data, function(account){
                var newAccount = new Account(account.name, account.phone, account.fax, account.site, account.address1, account.address2, account.city, account.zip);
                accounts.push(newAccount);
            });

            deferred.resolve(accounts);
            return deferred.promise;
        }

        function getAccountInJson(){
            var account ={
                name: 'Biff Tanner',
                phone: '111.111.1111',
                fax: '222.222.2222',
                site: 'BiffTheTanner.com',
                address1: '101 Biff Street',
                address2: 'TX',
                city: 'Future',
                zip: '77777'
            };

            return account;
        }

        function mockedAccounts(){
            var accounts = [
                {
                    name: 'Biff Tanner',
                    phone: '111.111.1111',
                    fax: '222.222.2222',
                    site: 'BiffTheTanner.com',
                    address1: '101 Biff Street',
                    address2: 'TX',
                    city: 'Future',
                    zip: '77777'
                },
                {
                    name: 'Tom Brady',
                    phone: '444.444.4444',
                    fax: '000.000.1111',
                    site: 'SoSorry.com',
                    address1: '404 Ban Drive',
                    address2: 'MA',
                    city: 'New England',
                    zip: '12345'
                },
                {
                    name: 'King Kong',
                    phone: '999.999.9999',
                    fax: '',
                    site: 'KingKong.com',
                    address1: '787 Jungle Avenue',
                    address2: 'Central African Republic',
                    city: 'Bangey',
                    zip: '25-78945'
                },
                {
                    name: 'Joe Dirt',
                    phone: '888.888.8888',
                    fax: '333.333.3333',
                    site: 'google.com',
                    address1: '555 Dirt St',
                    address2: 'AL',
                    city: 'Mobile',
                    zip: '45687'
                }
            ];

            return accounts;
        }
    }
})();