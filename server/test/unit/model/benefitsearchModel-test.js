var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var _ = require('lodash');

var SM = require('../../../model/models/benefitSearchModel');

describe('Search Model Constructor', function () {
    it('should have been created', function () {
        var model = new SM();
        expect(model).to.not.equal(null);
    });

    it('should have data', function () {
        var model = new SM({state : "CA"});
        expect(model.get('state')).to.equal("CA");
    });

    it('should allow set (because of schema)', function () {
        var model = new SM({state : "CA"});
        expect(model.get('state')).to.equal("CA");
    });

    it('should NOT allow set (because of schema)', function () {
        var model = new SM({homeState : "CA"});
        expect(model.get('state')).to.not.equal("CA");
    });
});


describe('Search Model - test mode', function () {
    it('should have been created', function () {
        var model = new SM();
        expect(model).to.not.equal(null);
    });

    it('should have test mode set', function () {
        var model = new SM({}, true);
        expect(model.isTestMode()).to.equal(true);
    });

    it('should NOT have test', function () {
        var model = new SM({});
        expect(model.isTestMode()).to.equal(false);
    });

    it('should NOT have test', function () {
        var model = new SM({}, false);
        expect(model.isTestMode()).to.equal(false);
    });

    it('should NOT have test because of test zip', function () {
        var model = new SM({zipcode : '00001'});
        expect(model.isTestMode()).to.equal(false);
    });

    it('should NOT have test because of test zip', function () {
        var model = new SM({zipcode : '92120'});
        expect(model.isTestMode()).to.equal(false);
    });


});

describe('Search Model - normalize', function () {
    it('lastMonthTotalIncome', function () {
        var sm = new SM();
        expect(sm.get('lastMonthTotalIncome')).to.equal(0);
        expect(sm.get('annualTotalIncome')).to.equal(0);

        sm = new SM({lastMonthTotalIncome : 1000});
        expect(sm.get('lastMonthTotalIncome')).to.equal(1000);
        expect(sm.get('annualTotalIncome')).to.equal(12000);

        sm = new SM({lastMonthIncome : 1000.75});
        expect(sm.get('lastMonthTotalIncome')).to.equal(1000.75);
        expect(sm.get('annualTotalIncome')).to.equal(12009);

        sm = new SM({lastMonthIncome : 1000, lastMonthOtherIncome : 10});
        expect(sm.get('lastMonthTotalIncome')).to.equal(1010);
        expect(sm.get('annualTotalIncome')).to.equal(12120);

        sm = new SM({lastMonthTotalIncome : 30.50, lastMonthIncome : 1000, lastMonthOtherIncome : 10});
        expect(sm.get('lastMonthTotalIncome')).to.equal(30.50);
        expect(sm.get('annualTotalIncome')).to.equal(366);

    });

    it('householdMaxAge', function () {
        var sm = new SM();
        expect(sm.get('householdMaxAge')).to.equal(0);

        sm = new SM({householdMaxAge : 100});
        expect(sm.get('householdMaxAge')).to.equal(100);

        sm = new SM({age : 100});
        expect(sm.get('householdMaxAge')).to.equal(100);

        sm = new SM({age : 99, spouseAge : 100});
        expect(sm.get('householdMaxAge')).to.equal(100);

        sm = new SM({householdMaxAge : 3, age : 99, spouseAge : 100});
        expect(sm.get('householdMaxAge')).to.equal(3);

    });

    it('householdSize', function () {
        var sm = new SM();
        expect(sm.get('householdSize')).to.equal(0);

        sm = new SM({spouseAge : 100});
        expect(sm.get('householdSize')).to.equal(2);


        sm = new SM({childAges : [1,2]});
        expect(sm.get('householdSize')).to.equal(3);

        sm = new SM({spouseAge : 3, childAges : [1,2]});
        expect(sm.get('householdSize')).to.equal(4);

        sm = new SM({householdSize : 1, spouseAge : 3, childAges : [1,2]});
        expect(sm.get('householdSize')).to.equal(1);


    });
});


