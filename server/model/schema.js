"use strict";

var _ = require('lodash');
var deepFreeze = require('deep-freeze');

module.exports = function Schema (def) {
    var _def = def || {};
    _def = _.omit(_def, "_metaData");
    var _metaData = def ? def._metaData : null;
    var _mutable = def ? (def._metaData ? def._metaData.mutable : true) : true;
    var _groupId = def ? (def._metaData ? def._metaData.groupId : null) : null;

    // set the Def in stone
    deepFreeze(_def);

    return {

        Enum : "Enum",

        hasDefinition : function () {
            return this.keys().length > 0;
        },

        mutable : function () {
            return _mutable;
        },

        groupId : function () {
            return _groupId;
        },

        hasMetaData : function () {
            return _metaData !== null;
        },

        metaData : function () {
            return _metaData || {};
        },

        hasKey : function (key) {
            return _.has(_def, key);
        },

        defForKey : function (key) {
            if (this.hasKey(key)) {
                return _def[key];  // could return a copy for better encapsulation
            }
            else {
                return null;
            }
        },

        getAll : function () {
            return _def;
        },

        getOptionForKey : function (key, opt) {
            var k = this.defForKey(key);
            if (k) {
                return (typeof k[opt] !== "undefined") ? k[opt] : null;
            }
            return null;
        },

        keys : function () {
            return _.keys(_def);
        },

        each : function (func) {
            _.each(_def, func);
        }
    }
};