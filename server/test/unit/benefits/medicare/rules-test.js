var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('Medicare rules', function () {
    it('should NOT pass - is insured', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, insured : true});
        engine.run('medicare', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should NOT pass - no household age', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, insured : false});
        engine.run('medicare', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should NOT pass - is veteran', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, insured : false, householdMaxAge : 64});
        engine.run('medicare', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should pass', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, insured : false, householdMaxAge : 65});
        engine.run('medicare', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

});
