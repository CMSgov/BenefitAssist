var povertyLevel = require('../fpl');
var limits = require('./config');
var _ = require('lodash');

module.exports = {
    getRules : function (model) {
        return _.values(baseRules);
    }
};

// Must live in CA
// Must have a car valued under $20k and have a good driver status
// Income test - must by under 250% of the poverty level

var baseRules = {
    "state" : {
        "name" : "Auto Insurance state",
        "desc" : "Customer must live in CA",
        "state" : "CA",
        "benefit" : "autoinsurance",
        "condition" : function (RE) {
            RE.when("CA" != this.state);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Must live in California";
            RE.stop();
        }
    },
    "fpl" : {
        "name" : "Auto Insurance fpl",
        "desc" : "Customer must have qualifying FPL",
        "benefit" : "autoinsurance",
        "condition" : function (RE) {
            var user_fpl = povertyLevel.calcFPLLevel(this.annualTotalIncome, this.householdSize, this.state);
            var fplLimit = limits.getFPLLimit(this.state);
            RE.when(user_fpl > fplLimit);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Income too high";
            RE.stop();
        }
    },
    //"driver" : {
    //    "name" : "Auto Insurance good driver",
    //    "desc" : "Customer must have a good driving record",
    //    "state" : "CA",
    //    "benefit" : "autoinsurance",
    //    "condition" : function (RE) {
    //        RE.when(!this.goodDriver);
    //    },
    //    "consequence" : function (RE) {
    //        this.results.passed = false;
    //        this.results.errorMessage = "Must be good driver";
    //        RE.stop();
    //    }
    //},
    "cheap_car" : {
        "name" : "Auto Insurance cheap car",
        "desc" : "Customer customer must have a car worth under $20,000",
        "state" : "CA",
        "benefit" : "autoinsurance",
        "condition" : function (RE) {
            RE.when(!this.carUnder20k);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Must have a car under $20000";
            RE.stop();
        }
    }

};
