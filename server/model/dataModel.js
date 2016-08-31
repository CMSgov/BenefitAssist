"use strict";

var _ = require('lodash');
var schema = require('./schema');
var uuid = require('../util/uuid');
var Constants = require('../config/constants');
var logger = require('../logging/logger').getLogger();
var Class = require('../util/Class');
var stringUtil = require('../util/stringutil');

var DataModel = Class.extend({

    construct : function (inData, dataSchema, options) {

        this._id = uuid(true);

        // got a model passed to us, use its data as to hydrate our model
        if (inData instanceof DataModel) {
            inData = inData.getAll();
        }

        // Got a string that represents JSON, turn it into an object
        else if (_.isString(inData)) {
            try {
                inData = JSON.parse(inData);
            }
            catch (ex) {
                logger.error("Invalid JSON string passed to model constuctor: " + inData);
                inData = null;
            }
        }

        var self = this;
        self._options = options || {};
        self._definition = dataSchema || schema({});
        self._name = self._definition.metaData().name || uuid();
        self._mutable = true;
        self._model = {};

        self._mutable = self._definition.mutable();
        if (self._definition.hasDefinition()) {
            _.each(this._definition.getAll(), function (value, key) {
                if (_.has(value, "defaultValue")) {
                    // *** BAD - do not assign by reference ***
                    // self._model[key] = value.defaultValue;
                    self._model[key] = _.cloneDeep(value.defaultValue);
                }
                else {
                    self._model[key] = ""; // TODO should we really assign empty string?? probably not
                }
            });
        }

        self.update(_.cloneDeep(inData));
    },

    get : function (key) {
        //return this._model[key];
        return stringUtil.stringToFunction(_normalizeModelRef(key, true), this._model);

    },

    /**
     *
     * @param name - the name or key for the name/value pair
     * @param value - the value for the name/value pair
     * @param options [optional]
     *          silent - boolean to allow event not to be sent (default = false)
     */
    set : function (name, value, options) {
        options = options || {};

        // normalize the name
        // i.e. change the associated arrays in the format foo['bar'] -> foo.bar
        // also will normalize non-quoted indexes that are non-numeric foo[bar] -> foo.bar
        // but leaves along valid array indexes foo[0] -> foo[0]
        var key = _normalizeModelRef(name, true);

        // if the n comes in as dot notation to a nested object, grab that information
        var _namespace = key.match(/^(.*)\.(.*)$/);


        // If not mutable and we're adding a key, dont allow it
        if (!this._mutable) {
            // normalize name to convert arrays to dot notation and then grab the first namespace
            // to validate against the mutable flag
            var _n = _normalizeModelRef(name, true).match(/^(.*?)\.(.*)$/);
            _n = _n ? _n[1] : name;
            if (!this._definition.hasKey(_n)) {
                logger.warn("Model: " + this._name + " is not mutable.  Cannot add '" + key + "' to the definition", 'DataModel');
                return;
            }
        }

        // If there is a definition specified for this key
        // validate the input
        var propertyDefinition = this._definition.defForKey(_namespace ? _namespace[1] : key);
        if (propertyDefinition) {
            var type = propertyDefinition.type;
            if (type.name) {
                type = type.name;
            }
            if (_.isArray(type)) {
                type = "Array";
            }
            if (_.isObject(type)) {
                type = "Object";
            }
            var errMsg = "";


            switch (type.toUpperCase()) {
                case 'NUMBER' :
                    if (!_.isNumber(value)) {
                        try {
                            if (typeof value == "string") {
                                // See if the value contains a decimal
                                // get rid of the crap
                                value = value.replace(/[^0-9.]/g, '');
                                value = (value.indexOf('.') >= 0) ? parseFloat(value) : parseInt(value, 10);
                            }
                        }
                        catch (ex) {
                            value = null;
                        }

                        if (typeof value !== "number" || isNaN(value)) {
                            errMsg = "Model: " + this._name + ".  Cannot set '" + name + "' to value '" + value + "' - not a valid number";
                        }
                    }
                    break;
                case 'BOOLEAN' :
                    if (!_.isBoolean(value)) {
                        try {
                            if (null === value) {
                                value = false;
                            }
                            else if (_.isString(value)) {
                                if ('true' == value || '1' == value) {
                                    value = true;
                                }
                                else if ('false' == value || '0' == value) {
                                    value = false;
                                }
                            }
                        }
                        catch (ex) {
                            value = null;
                        }

                        if (!_.isBoolean(value)) {
                            errMsg = "Model: " + this._name + ".  Cannot set '" + name + "' to value '" + value + "' - not a boolean";
                        }
                    }
                    break;
                case 'STRING':
                    if (!_.isString(value)) {
                        errMsg = "Model: " + this._name + ".  Cannot set '" + name + "' to value '" + value + "' - not a valid string";
                    }
                    break;
                case 'ARRAY' :
                    if (!_.isArray(value)) {
                        if (!_isArray(name)) {
                            errMsg = "Model: " + this._name + ".  Cannot set '" + name + "' to value '" + value + "' - not an array";
                        }
                    }
                    break;
                case 'OBJECT' :
                    if (!_.isPlainObject(value)) {
                        errMsg = "Model: " + this._name + ".  Cannot set '" + name + "' to value '" + value + "' - not an object";
                    }
                    break;
                case 'REGEX' :
                    if (!_.isRegExp(value)) {
                        errMsg = "Model: " + this._name + ".  Cannot set '" + name + "' to value '" + value + "' - not an a regex";
                    }
                    break;
            }
            if (errMsg) {
                if (!options.silent) {
                    logger.warn(errMsg);
                }
                return;
            }

        }

        // foo[0] = val
        var _array = _isArray(name);
        var _obj;

        if (_array) {
            _obj = _findOrCreateCollection(this._model, _array[1], true);
            _obj[_array[2]] = value;
        }
        // foo.bar = val
        else if (_namespace) {
            _obj = _findOrCreateCollection(this._model, _namespace[1]);
            _array = _isArray(_namespace[2]);
            if (_array) {
                _obj[_array[1]] = _obj[_array[1]] || [];
                _obj[_array[1]][_array[2]] = value;
            }
            else {
                _obj[_namespace[2]] = value;
            }
        }
        else {
            this._model[key] = value;
        }

    },

    update : function (jsonObj) {
        if (!jsonObj) {
            return;
        }

        var self = this;
        // if obj is null or undefined, throw exception
        // cannot use typeof, because typeof null or object are both equal to "object"
        if (!_.isObject(jsonObj)) {
            logger.warn("Trying to update model '" + this._name + "' with a null/undefined object", 'DataModel');
            return;
        }
        _.each(jsonObj, function (value, key) {
            self.set(key, value);
        });
    },

    getAll : function () {
        return this._model;
    },

    getSchema : function () {
        return this._definition;
    },

    addMethod : function (func) {
        this[func.name] = func;
    },

    /**
     * Derived models can override
     */
    normalize : function () {

    }


});

module.exports = DataModel;

/**
 * normalize the name
 * i.e. change the associated arrays in the format foo['bar'] -> foo.bar
 * also will normalize non-quoted indexes that are non-numeric foo[bar] -> foo.bar
 * but leaves along valid array indexes foo[0] -> foo[0]
 *
 * @param ref
 * @param convertArraysToObject - convert arrays to dot notation always foo[0] -> foo.0
 */
function _normalizeModelRef (ref, convertArraysToObject) {
    return ref.replace(/(\[(.*?)\])/g, function () {
        if (arguments[1].match(/[\'\"]/) || isNaN(arguments[2]) || convertArraysToObject) {
            return "." + _removeQuotes(arguments[2]);
        }
        else {
            return arguments[0];
        }
    });
}

// create the object hierarchy and return the last reference
function _findOrCreateCollection (parent, nameSpace, asArray) {
    var _array = _isArray(nameSpace);
    var _p;

    var _names = nameSpace.match(/^(.*?)\.(.*)$/);  // non-greedy will get name.rest.
    if (_names) {
        if (_names[1]) {
            _array = _isArray(_names[1]);
            if (_array) {
                parent[_array[1]] = parent[_array[1]] || [];
                parent[_array[1]][_array[2]] = parent[_array[1]][_array[2]] || {};
                _p = parent[_array[1]][_array[2]];
            }
            else {
                parent[_names[1]] = parent[_names[1]] || {};
                _p = parent[_names[1]];
            }
        }
        return _findOrCreateCollection(_p, _names[2], asArray);
    }
    else if (_array) {
        parent[_array[1]] = parent[_array[1]] || [];
        parent[_array[1]][_array[2]] = parent[_array[1]][_array[2]] || (asArray ? [] : {});
        return parent[_array[1]][_array[2]];
    }
    else {
        parent[nameSpace] = parent[nameSpace] || (asArray ? [] : {});
        return parent[nameSpace];

    }

}

function _isArray (key) {
    return key.toString().match(/^(.*)\[(\d*?)\]$/);
}

function _removeQuotes (val) {
    return val.replace(/^["|'](.*?)["|']$/, "$1")
}