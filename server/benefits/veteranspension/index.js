var rules = require('./rules');
var def = require('./definition');

module.exports = {
    getRules : function (model) {
        return rules.getRules(model);
    },
    getDefinition : function (model) {
        return def.getDefinition(model);
    },
    getSavings : function (model) {
        return 0;
    }
};