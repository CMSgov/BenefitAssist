var Schema = require('../../model/schema');

var testDef = {
    "_metaData" : {
        "name" : "Test Schema",
        "mutable" : false,
        "groupId" : "test"
    },
    "string" : {
        "type" : "String",
        "defaultValue" : "foo"
    },
    "number" : {
        "type" : "Number",
        "defaultValue" : 100
    },
    "boolean" : {
        "type" : "Boolean",
        "defaultValue" : false
    },
    "array" : {
        "type" : "Array",
        "defaultValue" : []
    },
    "object" : {
        "type" : "Object",
        "defaultValue" : {}
    },
    "regex" : {
        "type" : "Regex"
    }
};

module.exports = new Schema(testDef);
