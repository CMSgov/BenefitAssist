var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

require('../../../benefits/index');


MF = require('../../../model/models/benefitSearchModel');
var model = new MF({'state' : "CA"});
var controller = require('../../../controllers/benefits_controller');

describe('Benefits Controller', function () {
    it('should have benefits', function (done) {
        controller.search(model, null, null, function (err, results) {
            expect(results.length).to.not.equal(0);
            done()
        });

    });

});