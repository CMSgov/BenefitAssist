var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var testSchema = require('../../fixtures/testSchema');
var schema = require('../../../model/schema');

describe('Schema No def', function () {
    var emptySchema = new schema();
    it('should have been created', function () {
        expect(emptySchema).to.not.equal(null);
    });
    it('should not have meta data', function () {
        var meta = emptySchema.metaData();
        expect(meta).to.deep.equal({});
        expect (emptySchema.hasMetaData()).to.equal(false);
    });
    it('should be mutable', function () {
        var mutable = emptySchema.mutable();
        expect(mutable).to.equal(true);
    });
    it('should be not have group id', function () {
        var g = emptySchema.groupId();
        expect(g).to.equal(null);
    });
    it('should not have key', function () {
        expect(emptySchema.hasKey('number')).to.equal(false);
    });
    it('should not have def for key', function () {
        expect(emptySchema.defForKey('number')).to.equal(null);
    });
    it('should not empty _def', function () {
        expect(emptySchema.getAll()).to.deep.equal({});
    });
    it('should not have option for key', function () {
        expect(emptySchema.getOptionForKey('number', 'type')).to.equal(null);
    });
    it('should not have keys', function () {
        expect(emptySchema.keys()).to.deep.equal([]);
    });
    it('should do nothing', function () {
        var count = 0;
        emptySchema.each(function (def) {
            count ++;
        });
        expect(count).to.equal(0);
    });
});

describe('Schema with def', function () {
    it('should have been created', function () {
        expect(testSchema).to.not.equal(null);
    });
    it('should have meta data', function () {
        var meta = testSchema.metaData();
        expect(meta).to.not.deep.equal({});
        expect (testSchema.hasMetaData()).to.equal(true);
    });
    it('should not be mutable', function () {
        var mutable = testSchema.mutable();
        expect(mutable).to.equal(false);
    });
    it('should have group id', function () {
        var g = testSchema.groupId();
        expect(g).to.equal('test');
    });
    it('should  have key', function () {
        expect(testSchema.hasKey('number')).to.equal(true);
    });
    it('should have def for key', function () {
        expect(testSchema.defForKey('number')).to.not.equal(null);
    });
    it('should not empty _def', function () {
        expect(testSchema.getAll()).to.not.deep.equal({});
    });
    it('should have option for key', function () {
        expect(testSchema.getOptionForKey('number', 'type')).to.equal("Number");
    });
    it('should have keys', function () {
        expect(testSchema.keys().length).to.deep.equal(6);
    });
    it('should do something', function () {
        var count = 0;
        testSchema.each(function (def) {
            count ++;
        });
        expect(count).to.equal(6);
    });
});