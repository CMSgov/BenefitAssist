var povertyLevel = require('../fpl');
var snapConfig = require('./config');
var savings = require('./savings');
var _ = require('lodash');
var merge = require('../../util/objectMerge');
var DataModel = require('../../model/dataModel');

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


// USDA based snap rules
var baseRules = {
    "fpl" : {
        "name" : "SNAP fpl limit",
        "desc" : "Customer FPS must be than the state based allowances",
        "benefit" : "snap",
        "state" : "US",
        "condition" : function (RE) {
            var user_fpl = povertyLevel.calcFPLLevel(this.annualTotalIncome, this.householdSize, this.state);
            var fplLimit = snapConfig.getFPLLimit(this.state);
            RE.when(user_fpl > fplLimit);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Income is too high";
            RE.stop();
        }
    },
    "moneyInBank" : {
        "name" : "SNAP money balance",
        "desc" : "Money in the bank must be less than the state based allowances",
        "benefit" : "snap",
        "state" : "US",
        "condition" : function (RE) {
            var disabledOrElderly = this.disabledMember || (this.householdMaxAge >= 60);

            var balanceLimit = snapConfig.getBalanceLimit(this.state , disabledOrElderly);
            RE.when(this.moneyBalance > balanceLimit);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Money in bank is too high";
            RE.stop();
        }
    },
    "$$savingsAmt" : {
        "name" : "SNAP  $$ savings",
        "desc" : "Savings greather than 0",
        "benefit" : "snap",
        "state" : "US",
        "condition" : function (RE) {
            var model = new DataModel(this);
            var customerAmt = savings.getSavings(model);

            RE.when(customerAmt.high <= 0);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "SNAP Savings is zero";
            RE.stop();
        }
    }
};

var stateSpecificRules = {

};
