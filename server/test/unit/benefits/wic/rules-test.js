var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('Wic rules', function () {
    it('should NOT pass - fpl', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50000, state : "CA", householdSize : 1, pregnantMember : true});
        engine.run('wic', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should NOT pass - no mother', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1});
        engine.run('wic', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should pass - pregnant', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, pregnantMember : true});
        engine.run('wic', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass - recent baby', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, recentBabyMember : true});
        engine.run('wic', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass - breastfeedingMember', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, breastfeedingMember : true});
        engine.run('wic', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass - childMember', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, childMember : true});
        engine.run('wic', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

});
