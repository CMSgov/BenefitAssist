/**
 *
 * Main entry point into the Benefit Assist applicaiton
 *  - start up the Restify Server
 *  - load up essential modules that are needed before anything else
 *  - set up listeners to gracefully shutdown if something horribly goes wrong in the app
 */

//===================================================
// get our AppDynamics fired up before everything else
//==================================================
//require('./config/appDynamics');

var Settings = require('./config/settings');
var Server = require('./restify_server'),
    Constants = require('./config/constants'),
    EventEmitter = require('./events/sharedEventEmitter'),
    logger = require('./logging/logger').getLogger();


//===================================================
// add the request extension to enable logging for external requests and
// dynamically add the proxy settings if specified
//===================================================
require('./util/requestExtension');


//===================================================
// Start the server
//===================================================
var webserver = new Server(Settings.server.name);
var running = true;
webserver.start(process.env.PORT || Settings.server.port);


//===================================================
// Exception handling with graceful shutdown
//===================================================
EventEmitter.on(Constants.events.applicationCrash, function (err) {
    gracefulShutdown();
});


webserver.on('uncaughtException', function (req, res, route, err) {
    logger.fatal({
        url : req.url,
        method : req.method,
        msg : err.message,
        stack : err.stack
    });
    res.writeHead(500);
    res.end(err.message);
    gracefulShutdown();
});


// Anything else that blows in the system that causes us to crash
process.on('uncaughtException', function (err) {
    logger.fatal('Process uncaught exception: ' + err.message);
    gracefulShutdown();
});

//listen for TERM signal, eg kill
process.on('SIGTERM', function () {
    logger.info('Closing [SIGTERM]');
    gracefulShutdown();
});

//listen for INT signal, eg Ctrl-C
process.on('SIGINT', function () {
    logger.info('Closing [SIGINT]');
    gracefulShutdown();
});


function gracefulShutdown () {

    // Just return without killing the process if we should not stop the server
    if (!running || !Settings.killProcessOnUncaughtException) {
        logger.info("Exception handled.  NOT killing process");
        return;
    }

    // stop taking new requests.
    webserver.stop();

    var killtimer = setTimeout(function () {
        logger.info('Kill state waited ' + Settings.killTimeout + ' ms. Exiting the process.');
        process.exit(0);
    }, Settings.killTimeout);
    killtimer.unref();

    running = false;
}



