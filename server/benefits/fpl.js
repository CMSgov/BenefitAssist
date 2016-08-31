// Specify the income limits based on persons in household
// limits are specified in an array with index 0 indicating 1 people in household  up to 8,
// then the additionalIncome per person kicks in
var tableHelper = require('./tableHelper');

var FPLIncomelimits = {

    "AK" : {
        annualIncomeLimitsPerPerson : [14840, 20020, 25200, 30380, 35560, 40740, 45920, 51120],
        additionalIncomePerPerson : 5200
    },
    "HI" : {
        annualIncomeLimitsPerPerson : [13670, 18430, 23190, 27950, 32710, 37470, 42230, 47010],
        additionalIncomePerPerson : 4780
    },
    "*" : {
        annualIncomeLimitsPerPerson : [11880, 16020, 20160, 24300, 28440, 32580, 36730, 40890],
        additionalIncomePerPerson : 4160
    }
};


module.exports = {

    /**
     * Get the FPL level based on total annual day income, household size, and resident state
     * @param annualIncome
     * @param householdSize
     * @param state
     * @returns {number}
     */
    calcFPLLevel : function (annualIncome, householdSize, state) {
        annualIncome = Number(annualIncome);
        householdSize = parseInt(householdSize, 10);
        if (isNaN(annualIncome) || isNaN(householdSize) || householdSize < 0) {
            return 0;
        }

        var fplIncome = tableHelper.getIncomeLevel(FPLIncomelimits, householdSize, state, 'annualIncomeLimitsPerPerson', 'additionalIncomePerPerson');
        return annualIncome ? annualIncome / fplIncome : 0;
    }
};

