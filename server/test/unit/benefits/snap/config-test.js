var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var _ = require('lodash');
var config = require('../../../../benefits/snap/config');
var stateCodes = require('../../../../util/stateCode');
var dataModel = require('../../../../model/dataModel');

var specialStates = [
    "CA",
    "CT",
    "DC",
    "MD",
    "ME",
    "MI",
    "MN",
    "NC",
    "NJ",
    "OR",
    "RI",
    "TX",
    "VT",
    "WA"
];
describe('SNAP Config - getFPLLimit', function () {
    it('FPL - no state', function () {
        var fpl = config.getFPLLimit();
        expect(fpl).to.equal(1.3);
    });

    // Special States
    // 2.0
    it('FPL - CA', function () {
        var fpl = config.getFPLLimit("CA");
        expect(fpl).to.equal(2.0);
    });
    it('FPL - WA', function () {
        var fpl = config.getFPLLimit("WA");
        expect(fpl).to.equal(2.0);
    });
    it('FPL - DC', function () {
        var fpl = config.getFPLLimit("DC");
        expect(fpl).to.equal(2.0);
    });
    it('FPL - MD', function () {
        var fpl = config.getFPLLimit("MD");
        expect(fpl).to.equal(2.0);
    });

    // 1.85
    it('FPL - CT', function () {
        var fpl = config.getFPLLimit("CT");
        expect(fpl).to.equal(1.85);
    });
    it('FPL - ME', function () {
        var fpl = config.getFPLLimit("ME");
        expect(fpl).to.equal(1.85);
    });
    it('FPL - MI', function () {
        var fpl = config.getFPLLimit("MI");
        expect(fpl).to.equal(1.85);
    });
    it('FPL - NJ', function () {
        var fpl = config.getFPLLimit("NJ");
        expect(fpl).to.equal(1.85);
    });
    it('FPL - OR', function () {
        var fpl = config.getFPLLimit("OR");
        expect(fpl).to.equal(1.85);
    });
    it('FPL - RI', function () {
        var fpl = config.getFPLLimit("RI");
        expect(fpl).to.equal(1.85);
    });
    it('FPL - VT', function () {
        var fpl = config.getFPLLimit("VT");
        expect(fpl).to.equal(1.85);
    });

    // 1.65
    it('FPL - TX', function () {
        var fpl = config.getFPLLimit("TX");
        expect(fpl).to.equal(1.65);
    });
    it('FPL - MN', function () {
        var fpl = config.getFPLLimit("MN");
        expect(fpl).to.equal(1.65);
    });

    // 1.0
    it('FPL - NC', function () {
        var fpl = config.getFPLLimit("NC");
        expect(fpl).to.equal(1);
    });


    // All the rest
    _.each(stateCodes.getStates(), function (obj) {
        var state = obj.code;
        if (!_.contains(specialStates, state)) {
            it('FPL - ' + state, function () {
                var fpl = config.getFPLLimit(state);
                expect(fpl).to.equal(1.3);
            });
        }
    })

});

describe('SNAP Config - getBalanceLimit', function () {
    it('BalanceLimit - normal - no state', function () {
        var balance = config.getBalanceLimit();
        expect(balance).to.equal(2250);
    });
    it('BalanceLimit - disabled - no state', function () {
        var balance = config.getBalanceLimit(undefined, true);
        expect(balance).to.equal(3250);
    });

    // test all states for normal
    _.each(stateCodes.getStates(), function (obj) {
        var state = obj.code;
        it('BalanceLimit - ' + state + " : Normal", function () {
            var balance = config.getBalanceLimit(state, false);
            expect(balance).to.equal(2250);
        });
    });

    // test all states for disabled
    _.each(stateCodes.getStates(), function (obj) {
        var state = obj.code;
        it('BalanceLimit - ' + state + " : Disabled", function () {
            var balance = config.getBalanceLimit(state, true);
            expect(balance).to.equal(3250);
        });
    })
});


