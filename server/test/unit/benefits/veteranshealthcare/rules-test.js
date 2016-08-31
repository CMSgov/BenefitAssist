var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('Veteran health care rules', function () {
    it('should pass - is veteran', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, isVeteran : true});
        engine.run('veteranshealthcare', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });

    it('should NOT pass - is veteran', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50, state : "CA", householdSize : 1, isVeteran : false});
        engine.run('veteranshealthcare', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });

});
