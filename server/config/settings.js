/*global module:true, require:true */
var fs = require('fs');
var merge = require('../util/objectMerge');
var _ = require('lodash');
var path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// check to see if the env is namespaced per datacenter
var dc = env.split('.');
env = dc[0];
dc = dc[1];

// Pull the default config file and the environment specific one
// If env specific does not exist, use the depoloyment
var defaultConfig = require('./default.json');
var envSpecificConfig;

if (fs.existsSync(path.resolve(__dirname, env + ".json"))) {
    envSpecificConfig = require('./' + env + ".json");
}
else {
    envSpecificConfig = require('./development.json');
}
var settings = merge(defaultConfig, envSpecificConfig);

// merge in the app secrets
if (fs.existsSync(path.resolve(__dirname, 'secrets.json'))) {
    var secrets = require('./secrets.json');
    var defSecrets = secrets['default'];
    var envSecrets = secrets[env] || {};
    secrets = merge(defSecrets, envSecrets);
    settings = merge(settings, secrets);
}


_setDataCenterSettings(settings, dc);
_setENVSettings(settings);

module.exports = settings;


/**
 * Override config with data center specific options.
 * @param settings
 * @param dataCenter
 * @private
 */
function _setDataCenterSettings (settings, dataCenter) {
    var specificSettings = settings.dataCenterSpecific;

    if (specificSettings && dataCenter && specificSettings[dataCenter]) {

        _.each(specificSettings[dataCenter], function (value, key) {
            settings[key] = value;
        });
    }

    settings.dataCenterSpecific = undefined;
}


/**
 * Override config based setting with env specific ones if specified
 *
 * @param settings
 * @private
 */
function _setENVSettings (settings) {

}

