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
        name : 'Student Aid',
        desc : "You may qualify for federal student aid. Get a free downloadable fact sheet with everything from your tax return you'll need to apply.",
        sponsor : 'U.S. Department of Education',
        nextSteps : 'Complete your online application.',
        actionLabel : 'View my fact sheet',
        note : ' ',
        unknownAmount : false,
        url : 'https://fafsa.ed.gov/',
        applicationType : 'online',
        savingsLabel : 'Help',
        savingsNote : 'with application'
    }
};