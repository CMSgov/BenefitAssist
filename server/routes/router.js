var PingRoutes = require("./ping_routes");
var SearchRoutes = require("./search_routes");

var Router = {
    init : function (server) {
        PingRoutes.setup(server);
        SearchRoutes.setup(server);
    }
};

module.exports = Router;