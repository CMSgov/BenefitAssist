var _ = require('lodash');
var config = require('./config');
var povertyLevel = require('../fpl');

module.exports = {
    getRules : function (model) {
        return _.values(baseRules);
    }
};


var baseRules = {
    "age" : {
        "name" : "Max Age",
        "desc" : "Max Age in household is < 65",
        "benefit" : "medicaid",
        "condition" : function (RE) {
            RE.when(this.householdMaxAge && this.householdMaxAge >= 65);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            RE.stop();
        }
    },
    "insured" : {
        "name" : "Insured",
        "desc" : "Tax payer is insured",
        "benefit" : "medicaid",
        "condition" : function (RE) {
            RE.when(this.insured);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Already Insured";
            RE.stop();
        }
    },

    "disabled" : {
        "name" : "Disabled",
        "desc" : "Applicant is disabled",
        "benefit" : "medicaid",
        "condition" : function (RE) {
            RE.when(this.disabledMember);
        },
        "consequence" : function (RE) {
            this.results.passed = true;
            RE.stop();
        }
    },

    "kids" : {
        "name" : "Kids",
        "desc" : "Applicant has kids",
        "benefit" : "medicaid",
        "condition" : function (RE) {

            var user_fpl = povertyLevel.calcFPLLevel(this.annualTotalIncome, this.householdSize, this.state);
            var fplLimit = config.getFPLLimit(this.state, !!this.numKids);
            RE.when(user_fpl > fplLimit);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            RE.stop();
        }
    }

    //"gap" : {
    //    "name" : "Kids",
    //    "desc" : "Applicant has kids",
    //    "benefit" : "medicaid",
    //    "condition" : function (RE) {
    //        var fplLimit = fpl.calcFPLLevel(this.annualTotalIncome, this.householdSize, this.state);
    //        fplLimit -= 0.05;// 5% buffer
    //
    //        var idx = this.numKids ? 0 : 1;
    //        RE.when(config.MedicaidGapPercentByState[this.state] &&
    //                fplLimit > config.MedicaidGapPercentByState[this.state][idx] &&
    //                fplLimit <= 1.00 );
    //    },
    //    "consequence" : function (RE) {
    //        this.results.passed = true;
    //        RE.stop();
    //    }
    //},
    //"fail" : {
    //    "name" : "Does not qualify",
    //    "desc" : "Catch all",
    //    "benefit" : "medicaid",
    //    "condition" : function (RE) {
    //        RE.when(true);
    //    },
    //    "consequence" : function (RE) {
    //        this.results.passed = false;
    //        RE.stop();
    //    }
    //}
};
