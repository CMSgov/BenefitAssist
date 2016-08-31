module.exports = {
    getDefinition : function (model) {
        return Defs;
    }
};

var Defs = {
    order : 4,
    name : 'Veteran Pension',
    desc : 'VA helps Veterans and their families with financial challenges by providing supplemental income through the Veteran Pension.',
    qualifyText : 'You may be eligible for veteran pension.',
    sponsor : 'U.S. Department of Veterans Affairs',
    nextSteps : 'Complete your online application.',
    actionLabel : 'Apply online',
    savingsLabel : 'Tax-free',
    savingsNote : 'additional income',
    unknownAmount : false,
    applicationType : 'webkick',
    url : 'http://www.benefits.va.gov/pension'
};

