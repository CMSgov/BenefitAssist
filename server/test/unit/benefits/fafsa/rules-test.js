var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('FAFSA rules', function () {
    it('should pass - is Student', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, isStudent : true});
        engine.run('fafsa', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass - education credit', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, educationCredit : true});
        engine.run('fafsa', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass - hope credit', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, hopeCredit : true});
        engine.run('fafsa', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should NOT pass - is Student', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1});
        engine.run('fafsa', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });


});
