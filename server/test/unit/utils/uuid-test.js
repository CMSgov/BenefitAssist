var chai        = require('chai');
var expect      = require("chai").expect;
var sinon       = require('sinon');
var sinonChai   = require('sinon-chai');
var uuid = require('../../../util/uuid');

chai.use(sinonChai);

describe('UUID', function () {

    it('should return a long unique id', function () {
        var uid = uuid();
        expect(uid.length).to.equal(36)
    });
    it('should return a short unique id', function () {
        var uid = uuid(true);
        expect(uid.length).to.equal(12)
    });
    it('should return a a unique long id', function () {
        var uid1 = uuid();
        var uid2 = uuid();
        expect(uid1).not.to.equal(uid2)
    });
    it('should return a a unique short id', function () {
        var uid1 = uuid(true);
        var uid2 = uuid(true);
        expect(uid1).not.to.equal(uid2)
    });
});