(function () {
    'use strict';

    angular
        .module('app.loanApplication')
        .service('loanApplicationService', LoanApplicationService);

    LoanApplicationService.$inject = ['$q', 'logger'];

    function LoanApplicationService($q, logger) {
        var service = {
            getLoanForm: getLoanForm
        };

        function getLoanForm() {
            var deferred = $q.defer();
            var data = formConfig();
            deferred.resolve(data);
            return deferred.promise;
        }

        return service;


        function formConfig() {
            var config = {
                gettingStarted: [
                    {
                        "key": "requestedService",
                        "type": "radio",
                        "templateOptions": {
                            "label": "What can we help you with?",
                            "options": [
                                {
                                    "name": "I have chosen a property to purchase and need a loan.",
                                    "value": "1"
                                },
                                {
                                    "name": "I would like to refinance an existing mortgage.",
                                    "value": "2"
                                },
                                {
                                    "name": "I would like to receive cash by refinancing an existing mortgage.",
                                    "value": "3"
                                }
                            ],
                            required: true
                        }
                    },
                    {
                        "key": "propertyUse",
                        "type": "radio",
                        "templateOptions": {
                            "label": "How do you plan on using this property?",
                            "options": [
                                {
                                    "name": "This will be my primary residence.",
                                    "value": "1"
                                },
                                {
                                    "name": "This will be a second or vacation home.",
                                    "value": "2"
                                },
                                {
                                    "name": "This will be an investment property or rental home.",
                                    "value": "3"
                                }
                            ],
                            required: true
                        }
                    }
                ],
                personalInfo: [
                    {
                        key: "applicantType",
                        type: "radio",
                        defaultValue: "1",
                        templateOptions: {
                            label: "Who will be applying for this mortgage?",
                            options: [
                                {
                                    name: "I will be applying individually.",
                                    value: "1"
                                },
                                {
                                    name: "I will be applying jointly with my spouse.",
                                    value: "2"
                                },
                                {
                                    name: "I will be applying jointly with another person.",
                                    value: "3"
                                },
                                {
                                    name: "More than 2 people will be applying for this loan.",
                                    value: "4"
                                }
                            ],
                            required: true
                        }
                    },
                    {
                        template: "<hr /><div><strong>How should your name appear on the application and other legal documents?</strong></div>",
                    },
                    {
                        className: "row",
                        fieldGroup: [
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "firstName",
                                templateOptions: {
                                    label: "First Name",
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "lastName",
                                templateOptions: {
                                    label: "Last Name",
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "middleName",
                                templateOptions: {
                                    label: "Middle Name/Initial"
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "select",
                                key: "suffix",
                                defaultValue: "none",
                                templateOptions: {
                                    label: "Suffix",
                                    options: [
                                        {
                                            label: 'None',
                                            value: 'none'
                                        },
                                        {
                                            label: 'Jr',
                                            value: 'jr'
                                        },
                                        {
                                            label: 'Sr',
                                            value: 'sr'
                                        },
                                        {
                                            label: 'III',
                                            value: '3'
                                        }
                                    ],
                                    valueProp: 'value',
                                    labelProp: 'label',
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-12",
                                type: "alias",
                                key: "aliases",
                                defaultValue: []
                            },
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "social",
                                templateOptions: {
                                    label: "Social Security Number",
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "datepicker",
                                key: "dob",
                                templateOptions: {
                                    label: "Date of Birth",
                                    type: 'text',
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "age",
                                templateOptions: {
                                    label: "Age",
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "select",
                                key: "maritalStatus",
                                defaultValue: "married",
                                templateOptions: {
                                    label: "Marital Status",
                                    options: [
                                        {
                                            label: 'Married',
                                            value: 'married'
                                        },
                                        {
                                            label: 'Separated',
                                            value: 'separated'
                                        },
                                        {
                                            label: 'Unmarried',
                                            value: 'unmarried'
                                        }
                                    ],
                                    valueProp: 'value',
                                    labelProp: 'label',
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "yearsSchool",
                                templateOptions: {
                                    label: "Years of School"
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "dependentsAge",
                                templateOptions: {
                                    label: "Age of Dependents"
                                }
                            }
                        ]
                    },
                    {
                        template: "<hr /><div><strong>Co-Borrower Information</strong></div>",
                        hideExpression: "model.applicantType == 1",
                    },
                    {
                        className: "row",
                        hideExpression: "model.applicantType == 1",
                        fieldGroup: [
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "coFirstName",
                                templateOptions: {
                                    label: "First Name",
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "coLastName",
                                templateOptions: {
                                    label: "Last Name",
                                    required: true
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "input",
                                key: "coMiddleName",
                                templateOptions: {
                                    label: "Middle Name/Initial"
                                }
                            },
                            {
                                className: "col-xs-3",
                                type: "select",
                                key: "coSuffix",
                                defaultValue: "none",
                                templateOptions: {
                                    label: "Suffix",
                                    options: [
                                        {
                                            label: 'None',
                                            value: 'none'
                                        },
                                        {
                                            label: 'Jr',
                                            value: 'jr'
                                        },
                                        {
                                            label: 'Sr',
                                            value: 'sr'
                                        },
                                        {
                                            label: 'III',
                                            value: '3'
                                        }
                                    ],
                                    valueProp: 'value',
                                    labelProp: 'label',
                                    required: true
                                }
                            }
                        ]
                    }
                ],
                propertyInfo: [
                    {
                        template: "<div><strong>A credit report must be ordered to complete the application. Provide your authorization by answering yes below. (Your credit report will be ordered upon completing this page).<br><br>Credit Report Authorization</strong></div>",
                    },
                    {
                        key: "authorizeCredit",
                        type: "radio",
                        defaultValue: "1",
                        templateOptions: {
                            label: "Authorize Credit for Borrower",
                            options: [
                                {
                                    name: "Yes",
                                    value: "1"
                                },
                                {
                                    name: "No",
                                    value: "2"
                                }
                            ],
                            required: true
                        }
                    },
                    {
                        template: "<div><strong>IMPORTANT: Once you click Next - your credit report will be ordered. You will NOT be able to go back and change your borrower information or present address information. Click the back button if you want to review before continuing.</strong></div>",
                    }
                    
                ]
            };
            return config;
        }
    }
})();