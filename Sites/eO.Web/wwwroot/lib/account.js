'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EntityBase = (function () {
    function EntityBase(validationRules) {
        _classCallCheck(this, EntityBase);

        this._validationRules = validationRules;
    }

    _createClass(EntityBase, [{
        key: 'validate',
        value: function validate() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._validationRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var vr = _step.value;

                    console.log('Field: [' + vr.name + '] Required:' + vr.rules.required);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'getMinLength',
        value: function getMinLength(field) {
            var result = this._validationRules.find(function (x) {
                return x.name === field;
            });
            return result.rules.minLength;
        }
    }, {
        key: 'getMaxLength',
        value: function getMaxLength(field) {
            var result = this._validationRules.find(function (x) {
                return x.name === field;
            });
            return result.rules.maxLength;
        }
    }, {
        key: 'isRequired',
        value: function isRequired(field) {
            var result = this._validationRules.find(function (x) {
                return x.name === field;
            });
            return result.rules.required;
        }
    }]);

    return EntityBase;
})();

var Account = (function (_EntityBase) {
    _inherits(Account, _EntityBase);

    function Account(name, phone, fax, site, address1, address2, city, zip) {
        _classCallCheck(this, Account);

        _get(Object.getPrototypeOf(Account.prototype), 'constructor', this).call(this, [{ name: 'name', rules: { required: true, minLength: 2, maxLength: 100 } }]);

        this.name = name;
        this.phone = phone;
        this.fax = fax;
        this.site = site;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.zip = zip;
    }

    _createClass(Account, [{
        key: 'validate',
        value: function validate() {
            _get(Object.getPrototypeOf(Account.prototype), 'validate', this).call(this);
        }
    }, {
        key: 'getMinLength',
        value: function getMinLength(field) {
            return _get(Object.getPrototypeOf(Account.prototype), 'getMinLength', this).call(this, field);
        }
    }, {
        key: 'getMaxLength',
        value: function getMaxLength(field) {
            return _get(Object.getPrototypeOf(Account.prototype), 'getMaxLength', this).call(this, field);
        }
    }, {
        key: 'isRequired',
        value: function isRequired(field) {
            return _get(Object.getPrototypeOf(Account.prototype), 'isRequired', this).call(this, field);
        }
    }, {
        key: 'name',
        set: function set(name) {
            this._name = name;
        },
        get: function get() {
            return this._name;
        }
    }, {
        key: 'phone',
        set: function set(phone) {
            this._phone = phone;
        },
        get: function get() {
            return this._phone;
        }
    }, {
        key: 'fax',
        set: function set(fax) {
            this._fax = fax;
        },
        get: function get() {
            return this._fax;
        }
    }, {
        key: 'site',
        set: function set(site) {
            this._site = site;
        },
        get: function get() {
            return this._site;
        }
    }, {
        key: 'address1',
        set: function set(address1) {
            this._address1 = address1;
        },
        get: function get() {
            return this._address1;
        }
    }, {
        key: 'address2',
        set: function set(address2) {
            this._address2 = address2;
        },
        get: function get() {
            return this._address2;
        }
    }, {
        key: 'city',
        set: function set(city) {
            this._city = city;
        },
        get: function get() {
            return this._city;
        }
    }, {
        key: 'zip',
        set: function set(zip) {
            this._zip = zip;
        },
        get: function get() {
            return this._zip;
        }
    }]);

    return Account;
})(EntityBase);