var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var MF = require('../../../../model/dataModel');


describe('Lifeline FPL', function () {
    it('should pass Lifeline rules (fpl)', function (done) {
        var model = new MF({'state': "FL", 'annualTotalIncome' : 50, householdSize : 1});
        engine.run('lifeline', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass Lifeline rules ( 1.2999 fpl)', function (done) {
        var model = new MF({'state': "FL", 'annualTotalIncome' : 15300, householdSize : 1});
        engine.run('lifeline', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should NOT pass Lifeline rules (> 1.5 fpl)', function (done) {
        var model = new MF({'state': "FL", 'annualTotalIncome' : 20000, householdSize : 1});
        engine.run('lifeline', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });
});

describe('Lifeline CA Income', function () {
    it('should pass Lifeline rules (CA income)', function (done) {
        var model = new MF({'state': "CA", 'annualTotalIncome' : 50, householdSize : 1});
        engine.run('lifeline', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should NOT pass Lifeline rules (CA income)', function (done) {
        var model = new MF({'state': "CA", 'annualTotalIncome' : 25701, householdSize : 1});
        engine.run('lifeline', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done()
        });
    });
});


describe('TEST Lifeline Eligibility', function () {
    it('should pass Lifeline rules (> 1.5 fpl)', function (done) {
        var model = new MF({'state': "NY", 'annualTotalIncome' : 26238, 'householdSize' : 2});
        engine.run('lifeline', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });
});
