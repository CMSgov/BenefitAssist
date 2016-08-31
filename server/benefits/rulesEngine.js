var RulesEngine = require('node-rules');
var registry = require('./registry');
var logger = require('../logging/logger').getLogger("RulesEngine");
var _ = require('lodash');

module.exports = {
    run : function (benefit, model, callback) {

        // Get the rules filtered based on benefit and some other info
        var rules = registry.getRules(benefit, model);

        // Gen up a new engine -- TODO could this be global to save resources
        var engine = new RulesEngine(rules);

        try {
            var facts = _.cloneDeep(model.getAll());
            // Use our own results response
            // node-rules overloads the data model being passed in and its messy
            facts.results = {
                passed : true
            };

            engine.execute(facts, function (result) {
                var results = result.results;
                return callback(null, results);
            });
        }
        catch (ex) {
            logger.error(ex);
            return callback(ex);
        }
    }
};