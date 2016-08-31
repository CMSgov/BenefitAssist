var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('GI Bill rules', function () {
    it('should Not pass - active military but no dependents or spouse', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, isActiveMilitary : true, married: false});
        engine.run('gibill', model, function (err, results) {
            expect(results.passed).to.equal(false);
            expect(results.errorMessage).to.equal("Must have someone to transfer the GI bill to");
            done();
        });
    });

    it('should NOT pass - active military', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, isActiveMilitary : false});
        engine.run('gibill', model, function (err, results) {
            expect(results.passed).to.equal(false);
            expect(results.errorMessage).to.equal("Must be active in the military");
            done();
        });
    });
    it('should NOT pass - active military', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 0, isActiveMilitary : true});
        engine.run('gibill', model, function (err, results) {
            expect(results.passed).to.equal(false);
            expect(results.errorMessage).to.equal("Must have someone to transfer the GI bill to");
            done();
        });
    });
    it('should pass - active military and has a dependent or spouse', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 2, isActiveMilitary : true});
        engine.run('gibill', model, function (err, results) {
            expect(results.passed).to.equal(true);
            expect(results.errorMessage).to.equal(undefined);
            done();
        });
    });
    it('should pass - active military and has a dependent or spouse', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 5, isActiveMilitary : true});
        engine.run('gibill', model, function (err, results) {
            expect(results.passed).to.equal(true);
            expect(results.errorMessage).to.equal(undefined);
            done();
        });
    });
    it('should NOT pass - not active military and has spouse or dependents', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 2, isActiveMilitary : false});
        engine.run('gibill', model, function (err, results) {
            expect(results.passed).to.equal(false);
            expect(results.errorMessage).to.equal("Must be active in the military");
            done();
        });
    });
    it('should  pass - active military with household of 1 but married filed seperately', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, isActiveMilitary : true, married: true});
        engine.run('gibill', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

});
