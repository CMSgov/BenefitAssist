var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('Auto Insurance rules', function () {
    it('should pass Auto Insurance - FPL and state of CA', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, carUnder20k : true});
        engine.run('autoinsurance', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should NOT pass Auto Insurance - FPL and state of CA', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50000, state : "CA", householdSize : 1, carUnder20k : true});
        engine.run('autoinsurance', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should NOT pass Auto Insurance - FPL and state of CA, no cheap car', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, carUnder20k : false});
        engine.run('autoinsurance', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should NOT pass Auto Insurance - FPL and state of AZ', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "AZ", householdSize : 1, carUnder20k : true});
        engine.run('autoinsurance', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });
});
