module.exports = {
    getDefinition : function (model) {
        return baseDef;
    }
};

var baseDef = {
    order : 12,
    name : 'Medicaid',
    desc : 'A public health insurance program which provides health care services.',
    sponsor : 'U.S. Department of Health & Human Services',
    nextSteps : 'Complete your online application.',
    actionLabel : 'Apply online',
    unknownAmount : false,
    url : 'https://www.healthcare.gov/marketplace/b/welcome/',
    applicationType : 'webkick',
    savingsLabel : 'Free',
    savingsNote : 'medical insurance'

};