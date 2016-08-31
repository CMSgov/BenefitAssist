var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('Student loan repayment rules', function () {

    it('should pass - student loan interest', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, studentLoanInterest : 10});
        engine.run('studentloanrepayment', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should pass - student loan interest is 0', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, studentLoanInterest : 0});
        engine.run('studentloanrepayment', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

    it('should NOT pass - student loan interest', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, studentLoanInterest : -1});
        engine.run('studentloanrepayment', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

});
