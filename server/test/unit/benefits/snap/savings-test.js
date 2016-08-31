var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

require('../../../../benefits/index');

var registry = require('../../../../benefits/registry');
var MF = require('../../../../model/models/benefitSearchModel');

describe('SNAP Savings', function () {
    it('should return savings', function (done) {
        var model = new MF({state : "CA", 'annualTotalIncome' : 50});
        var savings = registry.getSavings('snap', model);
        expect(savings.low).to.not.equal(NaN);
        expect(savings.high).to.not.equal(NaN);
        done()
    });

    it('should return savings', function (done) {
        var model = new MF({state : "AK", 'annualTotalIncome' : 50});
        model.set('annualTotalIncome', 150000);
        var savings = registry.getSavings('snap', model);
        expect(savings.low).to.not.equal(NaN);
        expect(savings.high).to.not.equal(NaN);
        done()
    });

    it('should return savings', function (done) {
        var model = new MF({state : "HI", 'annualTotalIncome' : 50});
        model.set('annualTotalIncome', 0);
        model.set('householdSize', 20);
        var savings = registry.getSavings('snap', model);
        expect(savings.low).to.not.equal(NaN);
        expect(savings.high).to.not.equal(NaN);
        done()
    });

    it('should return savings', function (done) {
        var model = new MF({state : "CA", 'annualTotalIncome' : 50, numKids : 2, childcare : true, childcarePaid : 12000});
        model.set('annualTotalIncome', 0);
        model.set('householdSize', 20);
        var savings = registry.getSavings('snap', model);
        expect(savings.low).to.not.equal(NaN);
        expect(savings.high).to.not.equal(NaN);
        done()
    });

});