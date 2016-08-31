"use strict";

var path = require('path');
var deepFreeze = require('deep-freeze');
var projectDir = require('app-root-path').path;

var Constants = {
    projectDir : projectDir,
    applicationName : "Benefit Assist",
    logDir : path.resolve(projectDir, 'logs'),
    resourcesDir : path.resolve(projectDir, 'resources'),
    appId : "BenefitAssist",

    searchFilters : {
        mytt :  {
            'include' : [],
            'exclude' : []
        }
    },
    events : {
        applicationCrash : 'appCrash',
        errors : {
        },
        benefits : {
            applicationSent : 'benefitApplicationSent',
            eligibilitySearch : 'eligibilitySearch'
        }

    }
};
module.exports = deepFreeze(Constants);