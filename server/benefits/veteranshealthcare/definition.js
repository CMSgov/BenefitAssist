module.exports = {
    getDefinition : function (model) {
        return Defs;
    }
};

var Defs = {
    name : 'Veteran Health Care',
    desc : 'If you served in the active military, naval or air service and are separated under any condition other than dishonorable discharge, you may qualify for VA health care benefits.',
    qualifyText : 'You may be eligible for veteran health care.',
    sponsor : 'U.S. Department of Veterans Affairs',
    nextSteps : 'Complete your online application.',
    actionLabel : 'Apply online',
    savingsLabel : 'Discounted',
    savingsNote : 'health care',
    unknownAmount : false,
    applicationType : 'webkick',
    url : 'http://www.va.gov/healthbenefits'
};

