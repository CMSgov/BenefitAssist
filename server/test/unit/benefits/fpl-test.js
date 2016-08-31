var chai        = require('chai');
var expect      = require("chai").expect;
var sinon       = require('sinon');
var sinonChai   = require('sinon-chai');

var fpl = require('../../../benefits/fpl');

describe('FPL inputs', function () {
    it('should return 0 fpl with no parameters', function () {
        var usr_fpl = fpl.calcFPLLevel();
        expect(usr_fpl).to.equal(0);
    });

    it('should return 0 fpl with only annual income of 0', function () {
        var usr_fpl = fpl.calcFPLLevel(0, 1, "CA");
        expect(usr_fpl).to.equal(0);
    });

    it('should return 0 fpl with bad income', function () {
        var usr_fpl = fpl.calcFPLLevel("Foo", 1, "CA");
        expect(usr_fpl).to.equal(0);
    });

    it('should return fpl with income as string number', function () {
        var usr_fpl = fpl.calcFPLLevel("1000", 1, "CA");
        expect(usr_fpl).to.not.equal(0);
    });

    it('should return 0 fpl with no household', function () {
        var usr_fpl = fpl.calcFPLLevel(1000);
        expect(usr_fpl).to.equal(0);
    });

    it('should return 0 fpl with invalid household', function () {
        var usr_fpl = fpl.calcFPLLevel(1000, "Foo", "CA");
        expect(usr_fpl).to.equal(0);
    });

    it('should return fpl with  household as sting number', function () {
        var usr_fpl = fpl.calcFPLLevel(1000, "1", "CA");
        expect(usr_fpl).to.not.equal(0);
    });

    it('should return fpl with no state', function () {
        var usr_fpl = fpl.calcFPLLevel(1000, 1);
        expect(usr_fpl).to.not.equal(0);
    });

    it('should return fpl with invalid state', function () {
        var usr_fpl = fpl.calcFPLLevel(1000, 1, "Foo");
        expect(usr_fpl).to.not.equal(0);
    });

});

describe('FPL income calculations', function () {
    it('should return 100 %fpl with first range', function () {
        var usr_fpl = fpl.calcFPLLevel(11880, 1, "CA");
        expect(usr_fpl).to.equal(1);
    });

    it('should return  > 100 %fpl ', function () {
        var usr_fpl = fpl.calcFPLLevel(12000, 1, "CA");
        expect(usr_fpl).to.be.greaterThan(1);
    });

    it('should return  < 100 %fpl', function () {
        var usr_fpl = fpl.calcFPLLevel(10000, 1, "CA");
        expect(usr_fpl).to.be.lessThan(1);
    });
});

describe('FPL income 48 states', function () {
    // [11880, 16020, 20160, 24300, 28440, 32580, 36730, 40890] + 4160
    it('should return 100 %fpl with first range', function () {
        var usr_fpl = fpl.calcFPLLevel(11880, 1, "CA");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 2 range', function () {
        var usr_fpl = fpl.calcFPLLevel(16020, 2, "CA");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 3 range', function () {
        var usr_fpl = fpl.calcFPLLevel(20160, 3, "CA");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 4 range', function () {
        var usr_fpl = fpl.calcFPLLevel(24300, 4, "CA");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 5 range', function () {
        var usr_fpl = fpl.calcFPLLevel(28440, 5, "CA");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 6 range', function () {
        var usr_fpl = fpl.calcFPLLevel(32580, 6, "CA");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 7 range', function () {
        var usr_fpl = fpl.calcFPLLevel(36730, 7, "CA");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 8 range', function () {
        var usr_fpl = fpl.calcFPLLevel(40890, 8, "CA");
        expect(usr_fpl).to.equal(1);
    });

    it('should return 100 %fpl with 9 range', function () {
        var usr_fpl = fpl.calcFPLLevel(45050, 9, "CA");
        expect(usr_fpl).to.equal(1);
    });

    it('should return 100 %fpl with 19 range', function () {
        var usr_fpl = fpl.calcFPLLevel(82490, 18, "CA");
        expect(usr_fpl).to.equal(1);
    });

});


describe('FPL income Alaska', function () {
    // [14840, 20020, 25200, 30380, 35560, 40740, 45920, 51120] + 5200
    it('should return 100 %fpl with first range', function () {
        var usr_fpl = fpl.calcFPLLevel(14840, 1, "AK");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 2 range', function () {
        var usr_fpl = fpl.calcFPLLevel(20020, 2, "AK");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 3 range', function () {
        var usr_fpl = fpl.calcFPLLevel(25200, 3, "AK");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 4 range', function () {
        var usr_fpl = fpl.calcFPLLevel(30380, 4, "AK");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 5 range', function () {
        var usr_fpl = fpl.calcFPLLevel(35560, 5, "AK");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 6 range', function () {
        var usr_fpl = fpl.calcFPLLevel(40740, 6, "AK");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 7 range', function () {
        var usr_fpl = fpl.calcFPLLevel(45920, 7, "AK");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 8 range', function () {
        var usr_fpl = fpl.calcFPLLevel(51120, 8, "AK");
        expect(usr_fpl).to.equal(1);
    });

    it('should return 100 %fpl with 9 range', function () {
        var usr_fpl = fpl.calcFPLLevel(56320, 9, "AK");
        expect(usr_fpl).to.equal(1);
    });

    it('should return 100 %fpl with 19 range', function () {
        var usr_fpl = fpl.calcFPLLevel(103120, 18, "AK");
        expect(usr_fpl).to.equal(1);
    });

});


describe('FPL income HI', function () {
    // [13670, 18430, 23190, 27950, 32710, 37470, 42230, 47010] + 4780
    it('should return 100 %fpl with first range', function () {
        var usr_fpl = fpl.calcFPLLevel(13670, 1, "HI");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 2 range', function () {
        var usr_fpl = fpl.calcFPLLevel(18430, 2, "HI");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 3 range', function () {
        var usr_fpl = fpl.calcFPLLevel(23190, 3, "HI");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 4 range', function () {
        var usr_fpl = fpl.calcFPLLevel(27950, 4, "HI");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 5 range', function () {
        var usr_fpl = fpl.calcFPLLevel(32710, 5, "HI");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 6 range', function () {
        var usr_fpl = fpl.calcFPLLevel(37470, 6, "HI");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 7 range', function () {
        var usr_fpl = fpl.calcFPLLevel(42230, 7, "HI");
        expect(usr_fpl).to.equal(1);
    });
    it('should return 100 %fpl with 8 range', function () {
        var usr_fpl = fpl.calcFPLLevel(47010, 8, "HI");
        expect(usr_fpl).to.equal(1);
    });

    it('should return 100 %fpl with 9 range', function () {
        var usr_fpl = fpl.calcFPLLevel(51790, 9, "HI");
        expect(usr_fpl).to.equal(1);
    });

    it('should return 100 %fpl with 19 range', function () {
        var usr_fpl = fpl.calcFPLLevel(94810, 18, "HI");
        expect(usr_fpl).to.equal(1);
    });

});