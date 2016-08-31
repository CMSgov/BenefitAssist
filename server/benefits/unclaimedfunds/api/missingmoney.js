var Request = require('request');
var _ = require('lodash');
var Settings = require('../../../config/settings');
var Logger = require('../../../logging/logger').getLogger();

var _MissingMoneyAPI = Settings.services.missingMoney.url;

module.exports = {


    search : function (firstname, lastname, city, state, zip, callback) {

        //1 =  MATCH (if there is a match you will also receive a URL otherwise the URL will always be blank)
        //2 =  NO RESULTS
        //500 =  SERVER ERROR
        //700 =  NO API KEY MATCH
        //710 =  NO IP ADDRESS MATCH
        //720 =  DATABASE DOWN

        if (!firstname || !lastname) {
            return callback(new Error("Missing Money API search : Missing firstname or lastname"));
        }
        if (!state && !zip) {
            return callback(new Error("Missing Money API search : Missing state or zip"));
        }

        var searchInfo = {
            fname : firstname,
            lname : lastname,
            zipcode : zip,
            state : state,
            APIKey : Settings.services.missingMoney.apiKey
        };
        Request.post({url : _MissingMoneyAPI, form : searchInfo}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data;
                try {
                    data = _.isObject(body) ? body : JSON.parse(body);
                }
                catch (ex) {
                    Logger.error("Missing Money Response error: " + ex.message);
                    return callback("Missing Money Response error: " + ex.message);
                }
                if (data.CODE == "1" || data.CODE == "2") {
                    var results = {
                        details : {
                            count : (data.CODE == "1") ? 1 : 0,
                            items : [data.URL],
                            url : data.URL,
                            message : data.MESSAGE
                        }
                    };
                    return callback(null, results);
                }
                else {
                    Logger.error("Missing Money API error: " + data.MESSAGE);
                    return callback(new Error(data.MESSAGE))
                }


            }
            else {
                Logger.error('MissingMoney API search failed: ' +
                             ((error && error.message) ? error.message : ((response && response.statusCode) ? response.statusCode : '')));
                return callback(new Error(error));
            }
        });
    }
};