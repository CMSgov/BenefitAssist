var merge = require('../../util/objectMerge');

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
        name : 'Phone Service Assistance',
        desc : 'The Lifeline program provides discounted phone service to qualifying low-income households.',
        qualifyText : 'You may qualify for a free cell phone and free service.',
        sponsor : 'Federal Lifeline Assistance Program',
        nextSteps : 'Complete your online application.',
        actionLabel : "Apply online",
        unknownAmount : false,
        url : "https://www.fcc.gov/general/lifeline-program-low-income-consumers",
        applicationType : 'webkick',
        savingsLabel : 'Discounted',
        savingsNote : 'phone service'

    },
    "CA" : {
        desc : 'The federal Lifeline and California LifeLine Programs provide a discount on phone service to qualifying low-income households.',
        sponsor : 'Federal Lifeline Assistance Program and California LifeLine Assistance Program',
        applicationType : 'webkick'
    }
};

