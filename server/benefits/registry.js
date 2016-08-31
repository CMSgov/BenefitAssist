var logger = require('../logging/logger').getLogger();
var _ = require('lodash');

var registry = {};

var Registry = {
    registerBenefit : function (name, benefit) {
        registry[name] = benefit;
    },

    getBenefitNames : function () {
        return _.keys(registry);
    },

    getBenefit : function (name) {
        if (registry[name]) {
            return registry[name];
        }
        else {
            logger.error("Benefit does not exist in registry: " + name);
            return null;
        }
    },

    getDefinition : function (name, model, key) {
        if (registry[name] && _.isFunction(registry[name].getDefinition)) {
            var def = registry[name].getDefinition(model);
            return key ? def[key] : def;
        }
        else {
            logger.error("Definition does not exist for Benefit: " + name);
            return {};
        }
    },

    getRules : function (name, model) {
        if (registry[name] && _.isFunction(registry[name].getRules)) {
            return registry[name].getRules(model);
        }
        else {
            logger.error("Rules do not exist for Benefit: " + name);
            return [];
        }
    },

    getSavings : function (name, model) {
        if (registry[name] && _.isFunction(registry[name].getSavings)) {
            return registry[name].getSavings(model);
        }
        else {
            logger.info("Savings does not exist for Benefit: " + name);
            return 0;
        }
    }


};

module.exports = Registry;
