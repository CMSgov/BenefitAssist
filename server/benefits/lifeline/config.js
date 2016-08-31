var tableHelper = require('../tableHelper');

var lifeline_config = {
    "fpl" : {
        "*" : 1.35,
        "AZ" : 1.5,
        "FL" : 1.5,
        "KS" : 1.5,
        "MI" : 1.5,
        "NV" : 1.75,
        "NM" : 1.5,
        "OH" : 1.5,
        "TX" : 1.5
    },
    "income" : {
        "*" : {
        },
        "CA" : {
            annualIncomeLimitsPerPerson : [25700, 25700, 29900, 36200],
            additionalIncomePerPerson : 6300
        }
    }
};

module.exports = {
    getFPLLimit : function (state) {
        return tableHelper.getValue(lifeline_config.fpl, state);
    },

    getIncomeLimit : function (state, householdSize) {
        return tableHelper.getIncomeLevel(lifeline_config.income, householdSize, state, 'annualIncomeLimitsPerPerson', 'additionalIncomePerPerson');
    }
};

