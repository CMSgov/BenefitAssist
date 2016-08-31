var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var _ = require('lodash');
var config = require('../../../../benefits/wic/config');
var stateCodes = require('../../../../util/stateCode');
var dataModel = require('../../../../model/dataModel');

describe('AutoInsurance Config - getFPLLimit', function () {
    it('FPL - no state', function () {
        var fpl = config.getFPLLimit();
        expect(fpl).to.equal(1.85);
    });


    // All the rest
    _.each(stateCodes.getStates(), function (obj) {
        var state = obj.code;
        it('FPL - ' + state, function () {
            var fpl = config.getFPLLimit(state);
            expect(fpl).to.equal(1.85);
        });
    })

});

