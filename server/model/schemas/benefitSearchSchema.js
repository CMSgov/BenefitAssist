"use strict";

var Schema = require('../schema');

var SearchDef = {

    "_metaData" : {
        "name" : "Benefit Assist Search",
        "mutable" : false
    },

    "firstName" : {
        "type" : "String",
        "pii" : true
    },
    "lastName" : {
        "type" : "String",
        "pii" : true
    },
    "childAges" : {
        "type" : "Array",
        "defaultValue" : []
    },
    "householdMaxAge" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "insured" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "lastMonthIncome" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "lastMonthOtherIncome" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "lastMonthTotalIncome" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "annualTotalIncome" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "moneyBalance" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "city" : {
        "type" : "String"
    },
    "state" : {
        "type" : "String"
    },
    "zipcode" : {
        "type" : "String"
    },
    "country" : {
        "type" : "String"
    },
    "address" : {
        "type" : "String",
        "defaultValue" : "",
        "pii" : true
    },
    "aptNo" : {
        "type" : "String",
        "defaultValue" : "",
        "pii" : true
    },
    "age" : {
        "type" : "Number"
    },
    "spouseAge" : {
        "type" : "Number"
    },
    "numChildrenUnder26" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "numOthers" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "pregnantMember" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "recentBabyMember" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "breastfeedingMember" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "childMember" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "disabledMember" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "nursingCareMember" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "carUnder20k" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "childcarePaid" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "childcare" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "isStudent" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "studentLoanInterest" : {
        "type" : "Number",
        "defaultValue" : 0
    },

    "tuitionPaid" : {
        "type" : "Number",
        "defaultValue" : 0
    },

    "hopeCredit" : {
        "type" : "Number",
        "defaultValue" : 0
    },

    "educationCredit" : {
        "type" : "Number",
        "defaultValue" : 0
    },

    "householdSize" : {
        "type" : "Number",
        "defaultValue" : 0
    },

    "acaExemption" : {
        "type" : "Number",
        "defaultValue" : 0
    },
    "isActiveMilitary" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "isVeteran" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "married" : {
        "type" : "Boolean",
        "defaultValue" : false
    }
};


module.exports = new Schema(SearchDef);



