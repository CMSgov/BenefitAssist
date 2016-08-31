var _ = require('lodash');

module.exports = {
    getValue : function (table, state) {
        if (!table) {
            return null;
        }

        state = state || "*";
        state = state.toUpperCase();
        return table[state] || table['*'];
    },

    getIncomeLevel : function (table, householdSize, state, incomeRangeKey, additionalIncomeKey) {

        // filter out crap input
        householdSize = parseInt(householdSize, 10);
        if (!table || isNaN(householdSize) || householdSize < 0 || !incomeRangeKey || !additionalIncomeKey) {
            return 0;
        }

        // Get the object that represents income
        var incomeObj = this.getValue(table, state);
        if (!incomeObj) {
            return 0;

        }

        // figure out the ranges
        var incomeRanges = incomeObj[incomeRangeKey];
        var addlAmt = incomeObj[additionalIncomeKey];

        if (!_.isArray(incomeRanges) || !incomeRanges.length || _.isUndefined(addlAmt)) {
            return 0;
        }

        // figure out any additional amounts to add to our allowances
        var additionalSize = Math.max(0, householdSize - incomeRanges.length),
            additionalAmt = additionalSize * addlAmt;

        // trim household size to the max in the table if it is larger
        householdSize = Math.min(incomeRanges.length, householdSize);

        return incomeRanges[householdSize - 1] + additionalAmt;
    }
};