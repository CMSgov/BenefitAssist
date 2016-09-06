"use strict";

var restify = require('restify'),
    http = require('http'),
    https = require('https'),
    Router = require('./routes/router'),
    requestLogger = require('./middleware/request_logger'),
    noCache = require('./middleware/noCache'),
    testCheck = require('./middleware/test_check'),
    cors = require('./middleware/cors'),
    Constants = require('./config/constants'),
    logger = require('./logging/logger').getLogger();


// Set http global settings so we don't run out of sockets
https.globalAgent.maxSockets = Infinity;
http.globalAgent.maxSockets = Infinity;


/**
 * Application server
 */
function RestifyServer (name) {
    if (!(this instanceof RestifyServer)) {
        return new RestifyServer(name);
    }

    this.server = null;
    this.name = name;
}

/**
 *  Start method
 */
RestifyServer.prototype = {
    start : function (port) {
        var self = this;

        this.server = restify.createServer({ name : this.name});

        // setup CORS to allow versioning
        restify.CORS.ALLOW_HEADERS.push('accept-version');
        restify.CORS.ALLOW_HEADERS.push('authorization');
        restify.CORS.ALLOW_HEADERS.push('x-requested-with');
        restify.CORS.ALLOW_HEADERS.push('accept');
        this.server
            .use(requestLogger)     // log all requests
            .use(restify.CORS())    // enable cross domain handling
            .use(noCache)           // don't cache requests
            .use(restify.fullResponse())
            .use(restify.bodyParser({
                mapParams : false   // Query string parameters will not be in body parser, but in query string parser
            }))
            .use(restify.queryParser())
            .use(require('compression')())
            .use(require('cookie-parser')())
            .use(cors)              // enable CORS for domains specified in our settings
            .use(testCheck);        // check all requests for the test flag



        Router.init(this.server);  // Initialize all our RESTFul APIs

        this.server.listen(port, function () {
            logger.info('Starting Restify HTTP server ' + self.name + ' running on port ' + port);
        });

    },

    /**
     *  Stop the server
     */
    stop : function () {
        logger.info('Stopping Restify HTTP server ' + this.name);
        this.server.close();
    },

    on : function (eventName, callback) {
        return this.server.on(eventName, callback);
    }
};

module.exports = RestifyServer;

