/**
 * Define this limits per state for the fpl percentage
 * @type {string}
 */
var Constants = require('../../config/constants');
var tableHelper = require('../tableHelper');
var _ = require('lodash');

var snap_limits = {
    "fpl" : {
        "*" : 1.3,
        "AZ" : 1.3,
        "AL" : 1.3,
        "CA" : 2.0,
        "CT" : 1.85,
        "DC" : 2.0,
        "MD" : 2.0,
        "ME" : 1.85,
        "MI" : 1.85,
        "MN" : 1.65,
        "NC" : 1.0, // HACK for NC because they can't stand us sending traffic (should be 1.3)
        "NJ" : 1.85,
        "OR" : 1.85,
        "RI" : 1.85,
        "TX" : 1.65,
        "VT" : 1.85,
        "WA" : 2.0
    },
    "moneyBalance" : {
        "*" : [2250, 3250]  // balance for [basic, elderly or disabled]
    }
};


module.exports = {
    getFPLLimit : function (state) {
        return tableHelper.getValue(snap_limits.fpl, state);
    },

    getBalanceLimit : function (state, disabledOrElderly) {
        var idx = disabledOrElderly ? 1 : 0;
        return tableHelper.getValue(snap_limits.moneyBalance, state)[idx];
    }

};


