var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var MF = require('../../../../model/dataModel');

describe('SNAP FPL', function () {
    it('should pass SNAP rules (fpl)', function (done) {
        var model = new MF({'annualTotalIncome' : 0, householdSize : 1});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });


    it('should not pass SNAP rules (fpl)', function (done) {
        var model = new MF({'annualTotalIncome' : 50000, householdSize : 1});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(false);
            expect(results.errorMessage).to.not.equal(null);
            done();
        });
    });
});

describe('SNAP Money in back', function () {

    it('should pass SNAP rules (money in bank - not disabled)', function (done) {
        var model = new MF({'annualTotalIncome' : 50, householdSize : 1, moneyBalance : 100});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass SNAP rules (money in bank - disabled)', function (done) {
        var model = new MF({'annualTotalIncome' : 50, householdSize : 1, moneyBalance : 100, disabledMember : true});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass SNAP rules (money in bank - elderly)', function (done) {
        var model = new MF({'annualTotalIncome' : 50, householdSize : 1, moneyBalance : 100, householdMaxAge : 75});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });


    it('should NOT pass SNAP rules (money in bank - not disabled)', function (done) {
        var model = new MF({'annualTotalIncome' : 50, householdSize : 1, moneyBalance : 2251});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should pass NOT SNAP rules (money in bank - disabled)', function (done) {
        var model = new MF({'annualTotalIncome' : 50, householdSize : 1, moneyBalance : 3251, disabledMember : true});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should NOT pass SNAP rules (money in bank - elderly)', function (done) {
        var model = new MF({'annualTotalIncome' : 50, householdSize : 1, moneyBalance : 3251, householdMaxAge : 75});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });
});


describe('SNAP Savings Amt', function () {
    it('should pass SNAP savings amt', function (done) {
        var model = new MF({'annualTotalIncome' : 10, householdSize : 1, moneyBalance : 10, householdMaxAge : 25});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should NOT pass SNAP savings amt', function (done) {
        var model = new MF({'annualTotalIncome' : 150000, householdSize : 1, moneyBalance : 10, householdMaxAge : 25});
        engine.run('snap', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

});
