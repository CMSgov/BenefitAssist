var BenefitsController = require('../controllers/benefits_controller'),
    SearchModel = require('../model/models/benefitSearchModel'),
    jSend = require("../util/jsend");

var BenefitsRoutes = {

    setup : function (server) {

        /**
         * Eligibilty search based on posted data
         * Request a search for benetifs that the customer may be eligible for.
         *
         * POST data is a json object that conforms to the a benefitSearch schema
         *
         * Querystring Params
         *  test_mode=true (optional)
         *      emulate external calls to website screen scraping as not to spam them
         *      if eFaxing is enabled, this flag will send the fax to the Intuit fax machine
         *  appid (optional)
         *      argument to determine which programs perform searches on.
         *      if passed, will use the Constants.searchFilters[referrer] to look up list of programs
         *      otherwise all programs will be searched.
         *  benefit (optional)
         *      only return results for the requested benefit
         */
        server.post('/benefits/search', function (req, resp, next) {

            var appId = req.params.appid;
            var benefit = req.params.benefit;
            var model = new SearchModel(req.body, req.test);
            BenefitsController.search(model, appId, benefit, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, info);
                }
            });
        });

        /**
         * Eligibilty search based on posted data for a specific benefit
         *
         * POST data is a json object that represents a search data model
         *
         * Querystring Params - none
         *
         * URL parameters
         *      benefitName: the name of the benefit to test eligibility for. (i.e. snap, liheap, etc)
         *      as defined in the benefitDef file for the state.
         *
         * Returns :
         * {
         *      eligible : <true | false>
         * }
         */
        server.post('/benefits/eligible/:benefitName', function (req, resp, next) {
            var benefitName = req.params.benefitName;
            var dataModel = new SearchModel(req.body, req.test);

            BenefitsController.isEligible(benefitName, dataModel, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, info);
                }
            });
        });

    }
};

module.exports = BenefitsRoutes;