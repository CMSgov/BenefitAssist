var tableHelper = require('../tableHelper');

var wic_limits = {
    "fpl" : {
        "*" : 1.85
    }
};
module.exports = {
    getFPLLimit : function (state) {
        return tableHelper.getValue(wic_limits.fpl, state);
    }
};
