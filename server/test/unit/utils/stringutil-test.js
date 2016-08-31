/**
 * Created by npatwardhan on 6/29/15.
 */
var chai        = require('chai');
var expect      = require("chai").expect;
var should      = require("chai").should();
var sinon       = require('sinon');
var sinonChai   = require('sinon-chai');
var stringutil = require('../../../util/stringutil.js');
chai.use(sinonChai);

describe('stringutil makeSafe', function () {
    it('should return empty string', function (){
        var obj = stringutil.makeSafe(null);
        expect(obj).to.equal('');
    });

    it('should return the string object', function (){
        var obj = stringutil.makeSafe('hello');
        expect(obj).to.equal('hello');
    });
});

describe('stringutil isEmpty', function () {
    it('should return true if empty string', function (){
        var obj = stringutil.isEmpty('');
        expect(obj).to.equal(true);
    });

    it('should return false if string not empty', function (){
        var obj = stringutil.isEmpty('hello');
        expect(obj).to.equal(false);
    });
});

describe('stringutil trim', function () {
    it('should return trimmed string', function (){
        var obj = stringutil.trim(' hello world: ');
        expect(obj).to.equal('hello world:');
    });
});

describe('stringutil toDigitsOnly', function () {
    it('should return digits within the string', function (){
        var obj = stringutil.toDigitsOnly('h3ll0 123');
        expect(obj).to.equal('30123');
    });

    it('should return null string when no digits present', function (){
        var obj = stringutil.toDigitsOnly('hello');
        expect(obj).to.equal('');
    });
});

describe('stringutil zeropad', function () {
    it('should return string with a zero prepended to it', function (){
        var obj = stringutil.zeropad(2120,5);
        expect(obj).to.equal('02120');
    });

    it('should return the string as it is', function (){
        var obj = stringutil.zeropad(2120,3);
        expect(obj).to.equal('2120');
    });
});

describe('stringutil toThousandCommas', function () {
    it('should return string with thousand separator', function (){
        var obj = stringutil.toThousandCommas(986543);
        expect(obj).to.equal('986,543');
    });
});

describe('stringutil encodeXml', function(){
    it('should convert the xml into string', function (){
        var obj = stringutil.encodeXml('<hello world>');
        expect(obj).to.equal('&lt;hello world&gt;');
    });
});






