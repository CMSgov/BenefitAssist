var settings = require('../../config/settings');
var constants = require('../../config/constants');
var def = require('./definition');
var _ = require('lodash');
var api = require('./api/missingmoney');
var DataModel = require('../../model/dataModel');

module.exports = {
    getRules : function (model) {
        var state = model.get('state');
        var zip = model.get('zipcode');

        if (model.isTestMode()) {
            return testRule;
        }
        return rules;

    }
};

var rules = [
    {
        "name" : "Webkick",
        "desc" : "Check for automatic eligibility if we are a webkick state",
        "benefit" : "unclaimedfunds",
        "condition" : function (RE) {
            var model = new DataModel(this);
            var stateDef = def.getDefinition(model);
            RE.when(stateDef.applicationType === 'webkick');
        },
        "consequence" : function (RE) {
            this.results.passed = true;
            RE.stop();
        }
    },
    {
        "name" : "AutoEligible",
        "desc" : "Check for automatic eligibility if we search using tax data",
        "benefit" : "unclaimedfunds",
        "condition" : function (RE) {
            RE.when(this[constants.searchFromTaxData])
        },
        "consequence" : function (RE) {
            this.results.passed = true;
            RE.stop();
        }
    },
    {
        "name" : "Search",
        "desc" : "Search",
        "benefit" : "unclaimedfunds",
        "condition" : function (RE) {
            var self = this;
            api.search(this.firstName, this.lastName, this.homeCity, this.state, this.zipcode, function (error, results) {
                if (error || !results || !results.details) {
                    // If there was an error screen scraping the site, don't return an error to the caller
                    // this will keep the customer from seeing the option for unclaimed funds
                    // Give the customer the option, so they can link off to the website and see for themselves
                    // dont log, each screen scraper will log
                    //Logger.error(error);

                    RE.when(false); // let it pass
                }
                else {
                    self.results.url = results.details.url;
                    self.results.info = results.details;
                    RE.when(!results.details.count); // determine if there was a hit based on the number of matches found
                }
            })
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "No results found";
            RE.stop();
        }
    }
];

var testRule = [
    {
        "name" : "Emulator",
        "desc" : "Test",
        "benefit" : "unclaimedfunds",
        "condition" : function (RE) {
            searchEmulator(function (err, result) {
                RE.when(!result.eligible);
            })
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            this.results.errorMessage = "No results found";
            RE.stop();
        }
    }
];


function searchEmulator (callback) {

    setTimeout(function () {
        callback(null, {eligible : true, savings : 1, info : null});
    }, settings.services.ScreenScrapeService.emulatorTimeout);
}
