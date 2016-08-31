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
    "activemilitary" : {
        "name" : "Military Check",
        "desc" : "Must be active inf the military",
        "state" : "US",
        "benefit" : "gibilee",
        "condition" : function (RE) {
            RE.when(!this.isActiveMilitary);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Must be active in the military";
            RE.stop();
        }
    },
    "transferhousehold" : {
        "name" : "Married filing jointly or has dependents",
        "desc" : "Must have someone to transfer the GI bill to",
        "state" : "US",
        "benefit" : "gibilee",
        "condition" : function (RE) {
            RE.when(this.householdSize > 1);
        },
        "consequence" : function (RE) {
            this.results.passed = true;
            RE.stop();
        }
    },
    "transfermarried" : {
        "name" : "Married filing separately",
        "desc" : "Must have someone to transfer the GI bill to",
        "state" : "US",
        "benefit" : "gibilee",
        "condition" : function (RE) {
            RE.when(this.married);
        },
        "consequence" : function (RE) {
            this.results.passed = true;
            RE.stop();
        }
    },
    "fail" : {
        "condition" : function (RE) {
            RE.when(true);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "Must have someone to transfer the GI bill to";
            RE.stop();
        }
    }
};
