var jSend = require("../util/jsend");

var pkg = require('../package.json');

module.exports = {

    setup : function (server) {
        server.get('/ping', function (req, resp, next) {
            jSend.success(resp,
                {
                    'alive' : true,
                    'description' : pkg.description,
                    'version' : pkg.version,
                    'env' : process.env.NODE_ENV
                });
        });


        server.get('/ping/env', function (req, resp, next) {
            jSend.success(resp, {
                'env' : process.env.NODE_ENV
            });
        });

    }
};
