var povertyLevel = require('../fpl');
var liheap_limits = require('./config');
var merge = require('../../util/objectMerge');
var _ = require('lodash');


module.exports = {
    getRules : function (model) {
        var state = model.get('state');
        var stateRules = {};
        if (state) {
            stateRules = stateSpecificRules[state] || {};
        }
        return _.values (merge(baseRules, stateRules));
    }
};

// Liheap rules run either FPL or Annual Income
// Turn them both off, one will be turned on at runtime
var baseRules = {

    "income" : {
        "name" : "LIHEAP income limit",
        "desc" : "Annual income must be than the state based allowances",
        "state" : "US",
        "benefit" : "liheap",
        "priority" : 1,
        "on" : true,
        "condition" : function (RE) {
            var incomeLimit = liheap_limits.getIncomeLimit(this.state, this.householdSize);
            RE.when(this.annualTotalIncome > incomeLimit);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Income is too high";
            RE.stop();
        }
    }

};


var stateSpecificRules = {};