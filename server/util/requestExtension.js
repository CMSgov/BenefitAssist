/**
 * Override the request module to pass proxy settings to all external requests
 * if the proxy is defined in the config file AND the proxy has not already been set (to a url or null)
 *
 * We do tons of external request and don't want to add proxy to each one.
 * And there are a handful of service requests that don't need a proxy, so we'll explicitly set proxy:null on those
 *
 */

var request = require('request');
var _ = require('lodash');
var Settings = require('../config/settings');
var Logger = require('../logging/logger').getLogger();


request._get = request.get;  // save off the original get request
request._post = request.post; // save off the original post request
request._head = request.head; // save off the original post request
request._put = request.put; // save off the original post request
request._del = request.del; // save off the original post request

request.get = function (/* uri, options, callback*/) {
    var args = _getArgs(arguments, true);
    return request._get.apply(request, args);
};

request.post = function (/* uri, options, callback*/) {
    var args = _getArgs(arguments, true);
    return request._post.apply(request, args);
};

request.head = function (/* uri, options, callback*/) {
    var args = _getArgs(arguments, true);
    return request._head.apply(request, args);
};

request.put = function (/* uri, options, callback*/) {
    var args = _getArgs(arguments, true);
    return request._put.apply(request, args);
};

request.del = function (/* uri, options, callback*/) {
    var args = _getArgs(arguments, true);
    return request._del.apply(request, args);
};


/**
 * Get the arguments array and add the proxy and timeout setting if applicable
 * Log the request if applicabale
 *
 * @param inArgs
 * @returns {Array}
 * @private
 */
function _getArgs (inArgs) {
    var args = Array.prototype.slice.call(inArgs);

    var defaults;
    if (typeof args[0] == 'string') {
        // callback is second arg
        if (_.isFunction(args[1])) {
            args.splice(1, 0, {});
        }
        defaults = args[1];
    }
    else if (typeof args[0] == 'object') {
        defaults = args[0];
    }

    // Inject a proxy server if necessary
    if (Settings.proxyServer) {
        defaults.proxy = _.isUndefined(defaults.proxy) ? Settings.proxyServer : defaults.proxy;
    }

    // Inject the timeout
    if (Settings.requestTimeout) {
        defaults.timeout = _.isUndefined(defaults.timeout) ? Settings.requestTimeout : defaults.timeout;
    }

    _log(args);
    return args;
}

function _log (args) {
    if (!Settings.logs.logRequests) {
        return;
    }
    var reqInfo;
    if (typeof args[0] == 'string') {
        reqInfo = _.extend({url : args[0]}, args[1])
    }
    else if (typeof args[0] == 'object') {
        reqInfo = _.extend({}, args[0]);
    }

    try {
        var logObj = _.pick(reqInfo, ['url', 'proxy', 'headers']);

        // Deep clone the object so we don't stomp on headers
        logObj = JSON.parse(JSON.stringify(logObj));

        Logger.info(logObj);
    }
    catch (ex) {
        Logger.info(ex);
    }
}

module.exports = {};