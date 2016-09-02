var PingRoutes = require("./ping_routes");
var LogRoutes = require("./log_routes");
var SearchRoutes = require("./search_routes");

var Router = {
    init : function (server) {
        PingRoutes.setup(server);
        LogRoutes.setup(server);
        SearchRoutes.setup(server);
    }
};

module.exports = Router;