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
    "veteran" : {
        "name" : "Veteran Check",
        "desc" : "Must be a military veteran",
        "state" : "US",
        "benefit" : "veteranshealthcare",
        "condition" : function (RE) {
            RE.when(!this.isVeteran);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Must be a military veteran";
            RE.stop();
        }
    }
};
