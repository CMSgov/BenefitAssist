
var rules = require('./rules');
var def = require('./definition');
var savings = require('./savings');
var config = require('./config');

module.exports = {
    getRules : function (model) {
        return rules.getRules(model);
    },
    getDefinition : function (model) {
        return def.getDefinition(model);
    },
    getSavings : function (model) {
        return savings.getSavings(model);
    }
};