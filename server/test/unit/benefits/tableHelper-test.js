var chai        = require('chai');
var expect      = require("chai").expect;
var sinon       = require('sinon');
var sinonChai   = require('sinon-chai');

var tableHelper = require('../../../benefits/tableHelper');

var testFPLTable = {
    "AK" : {
        annualIncomeLimitsPerPerson : [14840, 20020, 25200, 30380, 35560, 40740, 45920, 51120],
        additionalIncomePerPerson : 5200
    },
    "HI" : {
        annualIncomeLimitsPerPerson : [13670, 18430, 23190, 27950, 32710, 37470, 42230, 47010],
        additionalIncomePerPerson : 4780
    },
    "*" : {
        annualIncomeLimitsPerPerson : [11880, 16020, 20160, 24300, 28440, 32580, 36730, 40890],
        additionalIncomePerPerson : 4160
    }
};

var noWildcardFPLTable = {
    "AK" : {
        annualIncomeLimitsPerPerson : [14840, 20020, 25200, 30380, 35560, 40740, 45920, 51120],
        additionalIncomePerPerson : 5200
    }
};


describe('Table Helper - getValue', function () {
    it('should NOT return a value', function () {
        var val = tableHelper.getValue();
        expect(val).to.equal(null);
    });
    it('should return a value', function () {
        var val = tableHelper.getValue(testFPLTable);
        expect(val).to.not.equal(null);
        expect(val).to.be.a('object');
    });
    it('should return a value', function () {
        var val = tableHelper.getValue(testFPLTable);
        expect(val.additionalIncomePerPerson).to.equal(4160);
    });
    it('should return a value', function () {
        var val = tableHelper.getValue(testFPLTable, "CA");
        expect(val.additionalIncomePerPerson).to.equal(4160);
    });

    it('should NOT return a value', function () {
        var val = tableHelper.getValue(noWildcardFPLTable, "CA");
        expect(val).to.be.a('undefined');
    });
});


describe('Table Helper - getIncomeLevel', function () {
    it('should NOT return a value', function () {
        var val = tableHelper.getIncomeLevel();
        expect(val).to.equal(0);
    });
    it('should NOT return a value - no household size', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable);
        expect(val).to.equal(0);
    });

    it('should NOT return a value - 0 household size', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable, 0);
        expect(val).to.equal(0);
    });

    it('should NOT return a value - invalid household size', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable, "FOO");
        expect(val).to.equal(0);
    });

    it('should NOT return a value - no income key', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable, 1, "CA");
        expect(val).to.equal(0);
    });

    it('should NOT return a value - no addl income key', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable, 1, "CA", "annualIncomeLimitsPerPerson");
        expect(val).to.equal(0);
    });

    it('should NOT return a value - invalid income key', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable, 1, "CA", "foo", "additionalIncomePerPerson");
        expect(val).to.equal(0);
    });

    it('should NOT return a value - invalid addl income key', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable, 1, "CA", "annualIncomeLimitsPerPerson", "foo");
        expect(val).to.equal(0);
    });

    it('should return a value - wildcard state', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable, 1, "CA", "annualIncomeLimitsPerPerson", "additionalIncomePerPerson");
        expect(val).to.equal(11880);
    });

    it('should return a value - state', function () {
        var val = tableHelper.getIncomeLevel(testFPLTable, 1, "HI", "annualIncomeLimitsPerPerson", "additionalIncomePerPerson");
        expect(val).to.equal(13670);
    });

    it('should NOT return a value - state', function () {
        var val = tableHelper.getIncomeLevel(noWildcardFPLTable, 1, "CA", "annualIncomeLimitsPerPerson", "additionalIncomePerPerson");
        expect(val).to.equal(0);
    });
});

