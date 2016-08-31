var _ = require('lodash');
var config = require("./config");
var povertyLevel = require('../fpl');

module.exports = {
    getRules : function (model) {
        return _.values(baseRules);
    }
};


var baseRules = {

    "fpl" : {
        "name" : "FPL",
        "desc" : "FPL must be below limit",
        "benefit" : "wic",
        "condition" : function (RE) {
            var user_fpl = povertyLevel.calcFPLLevel(this.annualTotalIncome, this.householdSize, this.state);
            var fplLimit = config.getFPLLimit(this.state);
            RE.when(user_fpl > fplLimit);
        },
        "consequence" : function (RE) {
            this.results.errorMessage = "Income too high";
            this.results.passed = false;
            RE.stop();
        }
    },

    "pregnant" : {
        "name" : "Pregnant",
        "desc" : "Tax payer is insured",
        "benefit" : "wic",
        "condition" : function (RE) {
            RE.when(!( this.pregnantMember || this.recentBabyMember || this.breastfeedingMember || this.childMember));
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Must have recent baby or pregnant";
            RE.stop();
        }
    }
};

