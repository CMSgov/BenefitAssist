var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var engine = require('../../../../benefits/rulesEngine');
var dataModel = require('../../../../model/dataModel');

describe('ACA Exemption', function () {
    it('should pass ACA rules (model)', function (done) {
        var model = new dataModel({'annualTotalIncome' : 0, acaExemption : true});
        engine.run('acaexemption', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });


    it('should NOT pass ACA rules (model)', function (done) {
        var model = new dataModel({'annualTotalIncome' : 50000, acaExemption : false});
        engine.run('acaexemption', model, function (err, results) {
            expect(results.passed).to.equal(false);
            done();
        });
    });
});
