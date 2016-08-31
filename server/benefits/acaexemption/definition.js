module.exports = {
    getDefinition : function (model) {
        return Defs;
    }
};

var Defs = {
        order : 1,
        name : 'Health Care Exemption',
        desc : 'Expecting a health care penalty? You may qualify to have it waived.',
        qualifyText : 'Expecting a health care penalty? You may qualify to have it waived.',
        sponsor : 'Affordable Care Act - www.healthcare.gov ',
        nextSteps : 'Complete the application and mail.',
        actionLabel : 'Complete application',
        savingsLabel : 'Avoid',
        savingsNote : 'health care penalty',
        unknownAmount : true,
        url : "https://turbotax.intuit.com/health-care/exemptions/",
        applicationType : 'webkick'

};

