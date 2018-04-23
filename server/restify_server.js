"use strict";

var restify = require('restify'),
    http = require('http'),
    https = require('https'),
    Router = require('./routes/router'),
    requestLogger = require('./middleware/request_logger'),
    noCache = require('./middleware/noCache'),
    testCheck = require('./middleware/test_check'),
    Constants = require('./config/constants'),
    logger = require('./logging/logger').getLogger(),
    Settings = require('./config/settings'),
    corsMiddleware = require('restify-cors-middleware');

// Set http global settings so we don't run out of sockets
https.globalAgent.maxSockets = Infinity;
http.globalAgent.maxSockets = Infinity;

class RestifyServer {
    constructor(name) {
        this.server = null;
        this.name = name;
    }

    start(port) {
        let self = this;

        this.server = restify.createServer({ name : this.name});

        const cors = corsMiddleware({
            preflightMaxAge: 5, //Optional
            origins: Settings.server.allowOrigins,
            // setup CORS to allow versioning
            allowHeaders: ['accept-version', 'authorization', 'x-requested-with','accept'],
        })

        this.server
            .pre(cors.preflight)
            .use(requestLogger)     // log all requests
            .use(cors.actual)    // enable cross domain handling
            .use(noCache)           // don't cache requests
            .use(restify.plugins.bodyParser({
                mapParams : false   // Query string parameters will not be in body parser, but in query string parser
            }))
            .use(restify.plugins.queryParser())
            .use(require('compression')())
            .use(require('cookie-parser')())
            .use(testCheck);        // check all requests for the test flag

        Router.init(this.server);  // Initialize all our RESTFul APIs

        this.server.listen(port, function () {
            logger.info('Starting Restify HTTP server ' + self.name + ' running on port ' + port);
        });
    }

    stop() {
        logger.info('Stopping Restify HTTP server ' + this.name);
        this.server.close();
    }

    on(eventName, callback) {
        return this.server.on(eventName, callback);
    }
}


module.exports = RestifyServer;

