'use strict';

var Settings = require('../config/settings');
var Logger = require('../logging/logger').getLogger();

var CORS = function (req, resp, next) {


    resp.header("Access-Control-Allow-Origin", Settings.server.allowOrigin);
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();


};

module.exports = CORS;