'use strict';

var logger = require('../logging/logger').getLogger();
/*
 * Middleware to log all the requests
 *
 */
var requestLogger = function (req, res, next) {
    var start = new Date();
    var end = res.end;
    res.end = function (chunk, encoding) {
        var responseTime = (new Date()).getTime() - start.getTime();
        end.call(res, chunk, encoding);
        var contentLength = parseInt(res.getHeader('Content-Length'), 10);
        var data = {
            url : req.url,
            method : req.method,
            result : res.statusCode,
            responseTime : responseTime,
            contentLength : isNaN(contentLength) ? 0 : contentLength
        };
        logger.info(data, "Middleware");
    };
    next();
};

module.exports = requestLogger;