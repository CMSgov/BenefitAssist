var Constants = require('../../config/constants');
module.exports = {
    getDefinition : function (model) {
        return baseDef;
    }
};

var baseDef = {
    order : 10,
    name : 'Women, Infants, & Children (WIC)',
    desc : 'Low-income, pregnant, postpartum women, and children under the age of 5 can receive supplemental foods and more.',
    qualifyText : 'You may qualify for free healthy foods for your family.',
    sponsor : 'USDA - United States Department of Agriculture',
    nextSteps : 'Schedule an appointment with your local WIC office.',
    actionLabel : 'Find your office',
    savingsLabel : 'Free',
    savingsNote : 'food & services',
    unknownAmount : false,
    url : 'http://www.fns.usda.gov/wic/Contacts/tollfreenumbers.htm',
    applicationType : "webkick"
};