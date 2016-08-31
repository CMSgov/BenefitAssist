var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var _ = require('lodash');
var config = require('../../../../benefits/medicaid/config');
var stateCodes = require('../../../../util/stateCode');
var dataModel = require('../../../../model/dataModel');

var specialStates = [
    'AK',
    'AL',
    'CT',
    'DC',
    'FL',
    'GA',
    'ID',
    'IN',
    'KS',
    'LA',
    'ME',
    'MO',
    'MS',
    'NC',
    'NE',
    'OK' ,
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VA',
    'WI',
    'WY'
];
describe('Medicaid Config - getFPLLimit', function () {
    it('FPL - no state', function () {
        var fpl = config.getFPLLimit();
        expect(fpl).to.equal(1.38);
    });

    it('FPL - AK', function () {
        var fpl = config.getFPLLimit("AK", true);
        expect(fpl).to.equal(1.43);
    });
    it('FPL - AK no kids', function () {
        var fpl = config.getFPLLimit("AK", false);
        expect(fpl).to.equal(1.38);
    });

    it('FPL - AL', function () {
        var fpl = config.getFPLLimit("AL", true);
        expect(fpl).to.equal(.18);
    });
    it('FPL - AL no kids', function () {
        var fpl = config.getFPLLimit("AL", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - CT', function () {
        var fpl = config.getFPLLimit("CT", true);
        expect(fpl).to.equal(1.55);
    });
    it('FPL - CT no kids', function () {
        var fpl = config.getFPLLimit("CT", false);
        expect(fpl).to.equal(1.38);
    });

    it('FPL - DC', function () {
        var fpl = config.getFPLLimit("DC", true);
        expect(fpl).to.equal(2.21);
    });
    it('FPL - DC no kids', function () {
        var fpl = config.getFPLLimit("DC", false);
        expect(fpl).to.equal(2.15);
    });

    it('FPL - FL', function () {
        var fpl = config.getFPLLimit("FL", true);
        expect(fpl).to.equal(.34);
    });
    it('FPL - FL no kids', function () {
        var fpl = config.getFPLLimit("FL", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - GA', function () {
        var fpl = config.getFPLLimit("GA", true);
        expect(fpl).to.equal(.37);
    });
    it('FPL - GA no kids', function () {
        var fpl = config.getFPLLimit("GA", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - ID', function () {
        var fpl = config.getFPLLimit("ID", true);
        expect(fpl).to.equal(.26);
    });
    it('FPL - ID no kids', function () {
        var fpl = config.getFPLLimit("ID", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - IN', function () {
        var fpl = config.getFPLLimit("IN", true);
        expect(fpl).to.equal(1.39);
    });
    it('FPL - IN no kids', function () {
        var fpl = config.getFPLLimit("IN", false);
        expect(fpl).to.equal(1.39);
    });

    it('FPL - KS', function () {
        var fpl = config.getFPLLimit("KS", true);
        expect(fpl).to.equal(.38);
    });
    it('FPL - KS no kids', function () {
        var fpl = config.getFPLLimit("KS", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - LA', function () {
        var fpl = config.getFPLLimit("LA", true);
        expect(fpl).to.equal(.24);
    });
    it('FPL - LA no kids', function () {
        var fpl = config.getFPLLimit("LA", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - ME', function () {
        var fpl = config.getFPLLimit("ME", true);
        expect(fpl).to.equal(1.05);
    });
    it('FPL - ME no kids', function () {
        var fpl = config.getFPLLimit("ME", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - MO', function () {
        var fpl = config.getFPLLimit("MO", true);
        expect(fpl).to.equal(.22);
    });
    it('FPL - MO no kids', function () {
        var fpl = config.getFPLLimit("MO", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - MS', function () {
        var fpl = config.getFPLLimit("MS", true);
        expect(fpl).to.equal(.27);
    });
    it('FPL - MS no kids', function () {
        var fpl = config.getFPLLimit("MS", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - NC', function () {
        var fpl = config.getFPLLimit("NC", true);
        expect(fpl).to.equal(.44);
    });
    it('FPL - NC no kids', function () {
        var fpl = config.getFPLLimit("NC", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - NE', function () {
        var fpl = config.getFPLLimit("NE", true);
        expect(fpl).to.equal(.63);
    });
    it('FPL - NE no kids', function () {
        var fpl = config.getFPLLimit("NE", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - OK', function () {
        var fpl = config.getFPLLimit("OK", true);
        expect(fpl).to.equal(.44);
    });
    it('FPL - OK no kids', function () {
        var fpl = config.getFPLLimit("OK", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - SC', function () {
        var fpl = config.getFPLLimit("SC", true);
        expect(fpl).to.equal(.67);
    });
    it('FPL - SC no kids', function () {
        var fpl = config.getFPLLimit("SC", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - SD', function () {
        var fpl = config.getFPLLimit("SD", true);
        expect(fpl).to.equal(.52);
    });
    it('FPL - SD no kids', function () {
        var fpl = config.getFPLLimit("SD", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - TN', function () {
        var fpl = config.getFPLLimit("TN", true);
        expect(fpl).to.equal(1.01);
    });
    it('FPL - TN no kids', function () {
        var fpl = config.getFPLLimit("TN", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - TX', function () {
        var fpl = config.getFPLLimit("TX", true);
        expect(fpl).to.equal(.18);
    });
    it('FPL - TX no kids', function () {
        var fpl = config.getFPLLimit("TX", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - UT', function () {
        var fpl = config.getFPLLimit("UT", true);
        expect(fpl).to.equal(.45);
    });
    it('FPL - UT no kids', function () {
        var fpl = config.getFPLLimit("UT", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - VA', function () {
        var fpl = config.getFPLLimit("VA", true);
        expect(fpl).to.equal(.39);
    });
    it('FPL - VA no kids', function () {
        var fpl = config.getFPLLimit("VA", false);
        expect(fpl).to.equal(0);
    });

    it('FPL - WI', function () {
        var fpl = config.getFPLLimit("WI", true);
        expect(fpl).to.equal(1);
    });
    it('FPL - WI no kids', function () {
        var fpl = config.getFPLLimit("WI", false);
        expect(fpl).to.equal(1);
    });

    it('FPL - WY', function () {
        var fpl = config.getFPLLimit("WY", true);
        expect(fpl).to.equal(.57);
    });
    it('FPL - WY no kids', function () {
        var fpl = config.getFPLLimit("WY", false);
        expect(fpl).to.equal(0);
    });


    // All the rest
    _.each(stateCodes.getStates(), function (obj) {
        var state = obj.code;
        if (!_.contains(specialStates, state)) {
            it('FPL - ' + state, function () {
                var fpl = config.getFPLLimit(state, true);
                expect(fpl).to.equal(1.38);
                fpl = config.getFPLLimit(state, false);
                expect(fpl).to.equal(1.38);
            });
        }
    })

});

