var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var _ = require('lodash');
var config = require('../../../../benefits/lifeline/config');
var stateCodes = require('../../../../util/stateCode');
var dataModel = require('../../../../model/dataModel');

var specialStates = [
    "CA",
    "AZ",
    "FL",
    "KS",
    "MI",
    "NV",
    "NM",
    "OH",
    "TX"
];
describe('Lifeline Config - getFPLLimit', function () {
    it('FPL - no state', function () {
        var fpl = config.getFPLLimit();
        expect(fpl).to.equal(1.35);
    });


    // 1.75
    it('FPL - NV', function () {
        var fpl = config.getFPLLimit("NV");
        expect(fpl).to.equal(1.75);
    });


    // Special States
    // 1.5
    it('FPL - FL', function () {
        var fpl = config.getFPLLimit("FL");
        expect(fpl).to.equal(1.5);
    });
    it('FPL - KS', function () {
        var fpl = config.getFPLLimit("KS");
        expect(fpl).to.equal(1.5);
    });
    it('FPL - MI', function () {
        var fpl = config.getFPLLimit("MI");
        expect(fpl).to.equal(1.5);
    });
    it('FPL - NM', function () {
        var fpl = config.getFPLLimit("NM");
        expect(fpl).to.equal(1.5);
    });
    it('FPL - OH', function () {
        var fpl = config.getFPLLimit("OH");
        expect(fpl).to.equal(1.5);
    });
    it('FPL - TX', function () {
        var fpl = config.getFPLLimit("TX");
        expect(fpl).to.equal(1.5);
    });


    // All the rest
    _.each(stateCodes.getStates(), function (obj) {
        var state = obj.code;
        if (!_.contains(specialStates, state)) {
            it('FPL - ' + state, function () {
                var fpl = config.getFPLLimit(state);
                expect(fpl).to.equal(1.35);
            });
        }
    })

});

describe('Lifeline Config - getIncomeLimit', function () {
    // CA [25700, 25700, 29900, 36200] + 6300
    it('BalanceLimit - CA household size 1', function () {
        var balance = config.getIncomeLimit("CA", 1);
        expect(balance).to.equal(25700);
    });

    it('BalanceLimit - CA household size 2', function () {
        var balance = config.getIncomeLimit("CA", 2);
        expect(balance).to.equal(25700);
    });

    it('BalanceLimit - CA household size 3', function () {
        var balance = config.getIncomeLimit("CA", 3);
        expect(balance).to.equal(29900);
    });

    it('BalanceLimit - CA household size 4', function () {
        var balance = config.getIncomeLimit("CA", 4);
        expect(balance).to.equal(36200);
    });

    it('BalanceLimit - CA household size 5', function () {
        var balance = config.getIncomeLimit("CA", 5);
        expect(balance).to.equal(42500);
    });
    it('BalanceLimit - CA household size 14', function () {
        var balance = config.getIncomeLimit("CA", 14);
        expect(balance).to.equal(99200);
    });

    _.each(stateCodes.getStates(), function (obj) {
        var state = obj.code;
        it("Balance Limit - " + state, function () {
            var limit = config.getIncomeLimit(state, 1);
            if (state != "CA") {
                expect(limit).to.equal(0);
            }
        });
    });
});
