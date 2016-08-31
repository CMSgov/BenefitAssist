var merge = require('../../util/objectMerge');

module.exports = {
    getDefinition : function (model) {
        var state = model.get('state');
        var stateDef = {};
        if (state) {
            stateDef = Defs[state] || {};
        }
        return merge(Defs['*'], stateDef);
    }
};

var Defs = {
    "*" : {
        oredr: 14,
        name : 'Low Cost Auto Insurance',
        desc : 'The Low-Cost Automobile Insurance Program allows you to pay a reduced car insurance premium year-round if you have a good driving record.',
        qualifyText : 'You may qualify for a discount off your car insurance bill.',
        sponsor : 'Department of Insurance',
        nextSteps : 'Print and complete the application.',
        actionLabel : 'Print the application',
        savingsLabel : 'Discounted',
        savingsNote : 'car insurance',
        unknownAmount : false,
        applicationType : 'webkick'
    },
    "CA" : {
        sponsor : 'California Department of Insurance',
        url : 'https://www.aipso.com/PlanSites/CaliforniaLowCost.aspx'
     }

};

