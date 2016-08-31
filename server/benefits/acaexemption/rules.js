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
    "exemptioncheck" : {
        "name" : "Exemption check",
        "desc" : "Must have indicated on tax return",
        "state" : "US",
        "benefit" : "acaexemption",
        "condition" : function (RE) {
            RE.when(!this.acaExemption);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Must have marked exemption on tax return";
            RE.stop();
        }
    }
};
