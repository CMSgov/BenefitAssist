'use strict';

var Settings = require('../config/settings');
var _ = require('lodash');
var Logger = require('../logging/logger').getLogger("Middleware");

/*
 * Middleware to validate requests have a valid api key in the 'Authorization' header
 *
 * returns a 403 if invalid
 */
module.exports = function (req, resp, next) {
    if (Settings.server.authorizationEnabled === false) {
        return next();
    }

    // get the authorization header
    var auth = req.headers.authorization;
    if (_.has(Settings.apiKeys, auth)) {
        Logger.info("Authorization allowed for user: " + Settings.apiKeys[auth] + ', for route: ' + req.url);
        next();
    }
    else {
        Logger.info("Authorization failed for token: " + auth);
        resp.writeHead(403);
        resp.end();
    }
};

