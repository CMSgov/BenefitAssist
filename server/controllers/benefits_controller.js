"use strict";

// initialize our benefits
require('../benefits/index');

var _ = require('lodash'),
    vasync = require('vasync'),
    Constants = require('../config/constants'),
    settings = require('../config/settings'),
    EventEmitter = require('../events/sharedEventEmitter'),
    Logger = require('../logging/logger').getLogger();

var benefit_registry = require('../benefits/registry');
var rules_engine = require('../benefits/rulesEngine');

var BenefitsController = {

    /**
     * Based on searchModel, is the data eligible for the requested benefit
     *
     * @param benefitName
     * @param model - benefitSearch Model
     * @param callback
     * @returns {'eligible' : true | false}
     */
    isEligible : function (benefitName, model, callback) {

        var state = model.get('state');
        if (!state) {
            var ex = new Error("Benefit Search for has no state in model");
            Logger.info(ex);
            return callback(ex);
        }

        rules_engine.run(benefitName, model, function (err, result) {
            if (err) {
                return callback(err)
            }
            return callback(null, {eligible : !!result.passed})
        });
    },

    /**
     * Perform a search based on the search model passed in
     *
     * @param model - search model
     * @param appId - (optional) appId to provide filtering mechanisms
     * @param benefit - (optional) benefit name to search for - will only perform the search for this one benefit.
     * @param callback
     * @returns {*}
     */
    search : function (model, appId, benefit, callback) {
        var functions = [],
            ex,
            state = model.get('state');

        if (!state) {
            ex = new Error("Benefit Search for has no state in model");
            Logger.info(ex);
            return callback(ex);
        }


        // Get the list of benefits from the registry
        var benefits = benefit_registry.getBenefitNames();

        // if filters are requested, use the list supplied
        // using intersection guarantees that we wont use crap filters that aren't actually a benefit.
        if (Constants.searchFilters[appId]) {
            if (_.isArray(Constants.searchFilters[appId].exclude) && Constants.searchFilters[appId].exclude.length > 0) {
                benefits = _.difference(benefits, Constants.searchFilters[appId].exclude);
            }
            if (_.isArray(Constants.searchFilters[appId].include) && Constants.searchFilters[appId].include.length > 0) {
                benefits = _.intersection(benefits, Constants.searchFilters[appId].include);
            }
        }

        // if we got passed a single benefit to search for, use it.
        if (benefit) {
            benefits = [benefit];
        }

        _.each(benefits, function (benefitName) {
            functions.push(
                function (callback) {
                    rules_engine.run(benefitName, model, function (err, result) {
                        if (err) {
                            return callback(err)
                        }
                        var benefitDef = benefit_registry.getDefinition(benefitName, model);
                        benefitDef.key = benefitName;

                        result.savings = benefit_registry.getSavings(benefitName, model);
                        return callback(null, _toBenefitResult(benefitDef, model, result, appId))
                    });
                })

        });

        // run benefits search in parallel,
        // return the result when all finished
        vasync.parallel({
                'funcs' : functions
            },
            function (error, results) {
                if (error) {
                    Logger.error('Failed to determine benefit eligibility: ' + ((error && error.message) ? error.message : ''));
                    //                            return callback(error);
                }
                var filteredResults = _.filter(results.successes, function (data) {
                    return !!data.resultDetails.passed;
                });

                // Sort the results list by the order property
                filteredResults = _.sortBy(filteredResults, function (o) {
                    return (o.order || 1000)
                });

                // Send off an application success event to anyone who is listening
                EventEmitter.emit(Constants.events.benefits.eligibilitySearch,
                    {
                        success : (null === error),
                        results : filteredResults,
                        model : model
                    });

                callback(null, filteredResults);
            });
    }
};

module.exports = BenefitsController;


function _toBenefitResult (benefit, model, searchResult, appId) {
    var val, cleanBenefit,
        result = {
            'key' : benefit.key,
            'amount' : searchResult.savings,
            'percentAmount' : searchResult.percentAmount,
            'resultDetails' : searchResult,
            'url' : searchResult.url || undefined,
            'status' : 'none'
        };
    if (_.isObject(searchResult.savings)) {
        result.amount = searchResult.savings.high;
        result.lowAmount = searchResult.savings.low;
    }

    cleanBenefit = _.omit(benefit, ['_private']);
    _.each(cleanBenefit, function (item, key) {
        val = item;

        if (_.isFunction(val)) {
            val = val.call(benefit, model, result);
        }
        result[key] = result[key] || val;

    });

    return result;
}

