var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var rewire = require("rewire");
var ucRules = rewire("../../../../benefits/unclaimedfunds/rules.js");
var ucDefs = require("../../../../benefits/unclaimedfunds/definition.js");
var engine = require('../../../../benefits/rulesEngine');
var MF = require('../../../../model/dataModel');
var SearchModel = require('../../../../model/models/benefitSearchModel');
var mockapi = require('../../testHelpers/mockUnclaimedFundsAPI');
var RuleEngine = require('node-rules');
var _ = require('lodash');


describe('UnclaimedFunds webkick[ed] states', function () {
    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should pass rules because states are webkicked', function (done) {
        var model = new SearchModel({'zipcode': '98001', 'state': "WA"});
        engine.run('unclaimedfunds', model, function (err, results) {
            expect(results.passed).to.equal(true);
            done();
        });
    });


    it('should pass if api returns an error for integrated state.', function (done) {
        mockapi.mockError = "There was an error in the API";
        ucRules.__set__('api', mockapi);
        var model = new SearchModel({'zipcode': '02740', 'state': "MA"});
        var abc = ucRules.getRules(model);
        var R = new RuleEngine([abc[1]]);
        var facts = _.cloneDeep(model.getAll());
        facts.results = {
            passed : true
        };
        R.execute(facts, function(result){
            expect(result.results.passed).to.equal(true);
            expect(result.results.errorMessage).to.equal(undefined);
            done();
        });

    });


    it('should not pass if api returns details count object.', function (done) {
        mockapi.reset();
        mockapi.mockResponse = {
            details : {
             count: 0,
             items : [],
             url : 'testURL',
             message : "TestMessage"
            }
        };
        ucRules.__set__('api', mockapi);
        var model = new SearchModel({'zipcode': '02740', 'state': "MA"});
        var abc = ucRules.getRules(model);
        var R = new RuleEngine([abc[2]]);
        var facts = _.cloneDeep(model.getAll());
        facts.results = {
            passed : true
        };
        R.execute(facts, function(result){
            expect(result.results.passed).to.equal(false);
            expect(result.results.errorMessage).to.equal("No results found");
            mockapi.reset();
            done();
        });

    });
    it('should pass if api returns details count object.', function (done) {
        mockapi.reset();
        mockapi.mockResponse = {
            details : {
                count: 1,
                items : [],
                url : 'testURL',
                message : "TestMessage"
            }
        };
        ucRules.__set__('api', mockapi);
        var model = new SearchModel({'zipcode': '02740', 'state': "MA"});
        var abc = ucRules.getRules(model);
        var R = new RuleEngine([abc[1]]);
        var facts = _.cloneDeep(model.getAll());
        facts.results = {
            passed : true
        };
        R.execute(facts, function(result){
            expect(result.results.passed).to.equal(true);
            expect(result.results.errorMessage).to.equal(undefined);
            mockapi.reset();
            done();
        });

    });
    it('should return online for states that are supported via the API and the user is in MyTT', function (done) {
        var modelData = {
            lastName: "smith",
            firstName: "john",
            zipcode: "02740",
            state: "MA"
        };

        var model = new SearchModel(modelData);
        var def = ucDefs.getDefinition(model);
        var type = def.applicationType;

        expect(def.applicationType).to.be.a("string");
        expect(type).to.equal('online');
        done()

    });
    it('should return webkick for states that are not supported via the API and the user is in MyTT', function (done) {
        var modelData = {
            lastName: "smith",
            firstName: "john",
            zipcode: "71601"
        };

        var model = new SearchModel(modelData);
        var def = ucDefs.getDefinition(model);


        expect(def.applicationType).to.be.a('string');
        expect(def.applicationType).to.equal('online');
        done();

    });
    it('should return webkick for all states in standalone', function (done) {
        var modelData = {
            lastName: "smith",
            firstName: "john",
            zipcode: "02740",
            state: "MA"
        }

        var model = new SearchModel(modelData);
        var def = ucDefs.getDefinition(model);
        var type = def.applicationType;

        expect(def.applicationType).to.be.a("string");
        expect(type).to.equal('online');
        done();

    });
    it('should return webkick for all states in standalone', function (done) {
        var modelData = {
            lastName: "smith",
            firstName: "john",
            zipcode: "92103",
            state: "CA"
        };

        var model = new SearchModel(modelData);
        var def = ucDefs.getDefinition(model);

        expect(def.applicationType).to.be.an('string');
        expect(def.applicationType).to.equal('webkick');
        done();

    });
});


