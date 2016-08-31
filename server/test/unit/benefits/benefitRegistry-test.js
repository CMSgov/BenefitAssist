var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

require('../../../benefits/index');

var registry = require('../../../benefits/registry');
SM = require('../../../model/models/benefitSearchModel');
var model = new SM({'annualTotalIncome' : 50});

describe('Benefits Registry', function () {
    it('should have benefits', function (done) {
        var benefits = registry.getBenefitNames();
        expect(benefits.length).to.not.equal(0);
        done()
    });

    it('should return rules', function (done) {
        var rules = registry.getRules('snap', model);
        expect(rules.length).to.not.equal(0);
        done()
    });

    it('should return definition', function (done) {
        var def = registry.getDefinition('lifeline', model);
        expect(def.length).to.not.equal(0);
        done()
    });


    it('should return a benefit', function (done) {
        var ben = registry.getBenefit('lifeline');
        expect(ben).to.not.equal(null);
        expect(ben).to.be.a("object");
        done()
    });

    it('should NOT return a benefit', function (done) {
        var ben = registry.getBenefit('foo');
        expect(ben).to.equal(null);
        done()
    });
});