var merge = require('../../util/objectMerge');
var settings = require('../../config/settings');

module.exports = {
    getDefinition : function (model) {
        var state = model.get('state');
        var stateDef = {};
        if (state) {
            stateDef = Defs[state] || {};
        }
        return merge(Defs["*"], stateDef);
    }
};

var Defs = {
    "*" : {
        order : 13,
        name : 'Student Loan Repayment',
        desc : 'The U.S. Department of Education&rsquo;s federal student loan repayment plans may help you lower your monthly payments.',
        qualifyText : 'You may qualify to make your federal student loan payment more affordable with a new payment plan.',
        sponsor : 'U.S. Department of Education',
        nextSteps : 'Find a student loan repayment plan.',
        actionLabel : 'Find a plan',
        unknownAmount : false,
        url : 'https://studentloans.gov/myDirectLoan/mobile/repayment/repaymentEstimator.action?from=turboTax',
        applicationType : 'webkick',
        savingsLabel : 'Lower',
        savingsNote : 'monthly payments'

    }
};