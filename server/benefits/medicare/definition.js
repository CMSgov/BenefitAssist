module.exports = {
    getDefinition : function (model) {
        return baseDef;
    }
};

var baseDef = {
    name : 'Medicare',
    desc : 'A public health insurance program which provides health care services for the elderly.',
    sponsor : 'U.S. Department of Health & Human Services',
    nextSteps : 'Complete your online application.',
    actionLabel : 'Apply online',
    unknownAmount : false,
    url : 'http://www.socialsecurity.gov/medicareonly/',
    applicationType : 'webkick',
    savingsLabel : 'Free',
    savingsNote : 'medical insurance'

};