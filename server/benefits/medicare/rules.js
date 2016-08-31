var _ = require('lodash');

module.exports = {
    getRules : function (model) {
        return _.values(baseRules);
    }
};


var baseRules = {
    "insured" : {
        "name" : "Insured",
        "desc" : "Tax payer is insured",
        "benefit" : "medicare",
        "condition" : function (RE) {
            RE.when(this.insured);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Already Insured";
            RE.stop();
        }
    },

    "age" : {
        "name" : "Max Age",
        "desc" : "Max Age in household is >= 65",
        "benefit" : "medicare",
        "condition" : function (RE) {
            RE.when(!this.householdMaxAge || this.householdMaxAge < 65);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Age < 65";
            RE.stop();
        }
    }
};
