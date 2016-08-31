var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var idx = require('../../../../benefits/acaexemption/index');
var dataModel = require('../../../../model/dataModel');


describe('ACA Exemption - index', function () {
    var m = new dataModel();
    m.set('state', "CA");
    it('should have rules', function () {
        var rules = idx.getRules(m);
        expect(rules).to.be.a("array");
    });

    it('should have definition', function () {
        var def = idx.getDefinition(m);
        expect(def).to.be.a("object");
    });

    it('should have savings', function () {
        var savings = idx.getSavings(m);
        expect(savings).to.equal(0);
    });

});