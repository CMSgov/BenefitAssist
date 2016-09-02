/**
 * Created by npatwardhan on 6/23/15.
 */
var logger = require('../logging/logger.js').getLogger();
var jSend = require("../util/jsend");

module.exports = {

    setup: function (server) {
        /**
         * Enable the UI to send logging information to the server
         * This enables us to know what is going on in the browser, otherwise its a black box
         *
         * @params
         *      : type < info | warn | error >
         */
        server.post('/log/:type', function (req, resp, next) {
            var type = req.params.type;
            var errObj = req.body;
            switch (type.toLowerCase()) {
                case "warn":
                    logger.warn(errObj);
                    break;
                case "error":
                    logger.error(errObj);
                    break;
                case "info":
                    logger.info(errObj);
                    break;
                default :
                    logger.error("Logger sent invalid error type: " + type);
            }
            jSend.success(resp, {success : true});
        });
    }
};

