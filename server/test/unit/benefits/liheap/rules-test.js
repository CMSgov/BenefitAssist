var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('Liheap rules', function () {
    it('should pass - income CA', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1});
        engine.run('liheap', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should NOT pass - income CA', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50000, state : "CA", householdSize : 1});
        engine.run('liheap', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

});
