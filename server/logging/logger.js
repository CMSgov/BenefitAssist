/*global module:true, require:true */

var Constants = require('../config/constants');
var fs = require('fs');
var _ = require('lodash');

var Loggers = {};

var logDir = Constants.logDir;
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

/**
 * Find or create a logger with the requested name
 * @param component
 * @returns {*}
 */
module.exports = {
    getLogger : function (component) {
        component = component || Constants.applicationName;

        // Create a new logger if one doesn't exist
        if (typeof Loggers[component] == 'undefined') {

            Loggers[component] = new YourLogger(component);
        }

        return Loggers[component];
    }
};


// TODO
// REPLACE WITH YOUR SPECIFIC LOGGING COMPONENT
//===============================================================
function YourLogger (component) {
    this.component = component || Constants.applicationName;

    this.info = function (msg) {
        console.info('%s: %s', this.component, _prettyprint(msg))
    };
    this.warn = function (msg) {
        console.warn('%s: %s', this.component, _prettyprint(msg))
    };
    this.error = function (msg) {
        console.error('%s: %s', this.component, _prettyprint(msg))
    };
    this.fatal = function (msg) {
        console.error('FATAL %s: %s', this.component, _prettyprint(msg))
    };

    function _prettyprint (msg) {
        if (_.isObject(msg) || _.isArray(msg)) {
            return JSON.stringify(msg, null, 2);
        }
        return msg;
    }
}

