'use strict';

var Settings = require('../config/settings');
var Logger = require('../logging/logger').getLogger();

/*
 * Inject cross domain access headers for origins specified in the settings.
 */
module.exports = function (req, resp, next) {

    resp.header("Access-Control-Allow-Origin", Settings.server.allowOrigin);
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
};
