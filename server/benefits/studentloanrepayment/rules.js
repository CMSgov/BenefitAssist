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
    "eligible" : {
        "name" : "Student Loan Repayment",
        "desc" : "Student Loadn Repayment Eligibility",
        "benefit" : "studentloanrepayment",
        "state" : "US",
        "condition" : function (RE) {
            RE.when(!this.studentLoanInterest  || this.studentLoanInterest < 1);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "No student Loan Interest paid";
            RE.stop();
        }
    }
};

var stateSpecificRules = {

};
