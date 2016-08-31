var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('Medicaid rules', function () {
    it('should pass', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, numKids : 0, householdMaxAge : 50, insured : false, disabledMember : true});
        engine.run('medicaid', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });
    it('should fail - maxAge', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, numKids : 0, householdMaxAge : 65, insured : false, disabledMember : false});
        engine.run('medicaid', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should fail - insured', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, numKids : 0, householdMaxAge : 50, insured : true, disabledMember : false});
        engine.run('medicaid', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should fail - FPL', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50000, state : "CA", householdSize : 1, numKids : 0, householdMaxAge : 50, insured : false, disabledMember : false});
        engine.run('medicaid', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should pass - disabled', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50000, state : "CA", householdSize : 1, numKids : 0, householdMaxAge : 50, insured : false, disabledMember : true});
        engine.run('medicaid', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

});
