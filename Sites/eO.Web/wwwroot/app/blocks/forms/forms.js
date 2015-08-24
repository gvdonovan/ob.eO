(function () {
    'use strict';

    angular
        .module('blocks.forms')
        .factory('forms', forms);

    forms.$inject = [];

    /* @ngInject */
    function forms() {
        var service = {
            datePickerConfig: datePickerConfig,
            borrowerAliasConfig: borrowerAliasConfig,
            plainInputsConfig: plainInputsConfig
        };

        return service;

        function datePickerConfig(formlyConfig) {
            formlyConfig.setType({
                name: 'datepicker',
                templateUrl: 'app/blocks/forms/templates/datepicker.html',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    templateOptions: {
                        addonLeft: {
                            class: 'glyphicon glyphicon-calendar'
                        }
                    }
                }
            });
        };

        function borrowerAliasConfig(formlyConfig) {
            formlyConfig.setType({
                name: 'alias',
                templateUrl: 'app/blocks/forms/templates/alias.html',
            });
        };


        function plainInputsConfig(formlyConfig) {
            formlyConfig.setType({
                name: 'plaininput',
                templateUrl: 'app/blocks/forms/templates/plainInputs/input.html'
            });

            formlyConfig.setType({
                name: 'plainselect',
                templateUrl: 'app/blocks/forms/templates/plainInputs/select.html',
            });
        };
    }
})();