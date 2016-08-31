/**
 * Define this limits per state for the fpl percentage
 * @type {string}
 */
var tableHelper = require('../tableHelper');

var autoinsurance_limits = {
        "fpl" : {
            "*" : 1.3,
            "CA" :  2.5
        }
};

module.exports = {
    getFPLLimit : function (state) {
        return tableHelper.getValue(autoinsurance_limits.fpl, state);
    }
};