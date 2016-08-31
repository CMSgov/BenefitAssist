var povertyLevel = require('../fpl');
var lifeline_limits = require('./config');
var _ = require('lodash');
var merge = require('../../util/objectMerge');

module.exports = {
    getRules : function (model) {
        var state = model.get('state');
        var stateRules = {};
        if (state) {
            stateRules = stateSpecificRules[state] || {};
        }
        return _.values(merge(baseRules, stateRules));
    }
};


var baseRules = {
    "income" : {
        "name" : "LIFELINE fpl limit",
        "desc" : "Customer FPS must be less than the state based allowances",
        "benefit" : "lifeline",
        "state" : "US",
        "priority" : 1,
        "on" : true,
        "condition" : function (RE) {
            var user_fpl = povertyLevel.calcFPLLevel(this.annualTotalIncome, this.householdSize, this.state);
            var fplLimit = lifeline_limits.getFPLLimit(this.state);
            RE.when(user_fpl > fplLimit);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Income is too high";
            RE.stop();
        }
    }
};

var stateSpecificRules = {
    "CA" : { // overwrite the FPL rule to use income
        "income" : {
            "name" : "Lifeline income limit",
            "desc" : "Customer income must be less than the state based allowances",
            "benefit" : "lifeline",
            "state" : "CA",
            "priority" : 1,
            "on" : true,
            "condition" : function (RE) {
                var incomeLimit = lifeline_limits.getIncomeLimit(this.state, this.householdSize);
                RE.when(this.annualTotalIncome > incomeLimit);
            },
            "consequence" : function (RE) {
                this.results.passed = false;
                this.results.errorMessage = "Income is too high";
                RE.stop();
            }
        }
    }
};
