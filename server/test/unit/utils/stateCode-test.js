/**
 * Created by npatwardhan on 6/25/15.
 */
var chai        = require('chai');
var expect      = require("chai").expect;
var should      = require("chai").should();
var sinon       = require('sinon');
var sinonChai   = require('sinon-chai');
var stateCode = require('../../../util/stateCode.js');
chai.use(sinonChai);

describe('stateCode getStates', function () {
    it('should return list of states', function (){
        var states = stateCode.getStates();
        should.exist(states);
        states.should.be.an('array');
        states.should.have.length(51);
    });
});

describe('stateCode getStates', function () {
    it('should return code for the state', function () {
        var sc = stateCode.toStateCode("Massachusetts");
        sc.should.be.equal("MA");
    });

    it('should return empty string for the unknown state', function(){
        var sc = stateCode.toStateCode("random");
        expect(sc).to.be.a('string');
        sc.should.be.equal("");
    });
});

describe('territory ', function () {
    it('should return false if not territory', function(){
        expect(stateCode.isTerritoryZip("")).to.not.equal(true);
    });
    it('should return false if not territory', function(){
        expect(stateCode.isTerritoryZip("92129")).to.not.equal(true);
    });

    it('should return true if territory exists', function(){
        expect(stateCode.isTerritoryZip("96799")).to.be.a('object');
    });
});


describe('military ', function () {
    it('should return false if not military', function(){
        expect(stateCode.isMilitaryZip("")).to.not.equal(true);
    });

    it('should return false if not military', function(){
        expect(stateCode.isMilitaryZip("92129")).to.not.equal(true);
    });

    it('should return true if territory exists', function(){
        expect(stateCode.isMilitaryZip("09000")).to.be.a('object');
    });
});