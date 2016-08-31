var chai = require('chai');
var expect = require("chai").expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var testSchema = require('../../fixtures/testSchema');

DM = require('../../../model/dataModel');


describe('Data Model Creation', function () {
    it('should have been created', function () {
        var model = new DM();
        expect(model).to.not.equal(null);
    });

    it('should have data - passed in object', function () {
        var model = new DM({"foo" : "bar"});
        expect(model._model).to.deep.equal({"foo" : "bar"});
    });

    it('should have data - passed in string object', function () {
        var model = new DM('{"foo" : "bar"}');
        expect(model._model).to.deep.equal({"foo" : "bar"});
    });
});

describe('Data Model Get/Set No Schema', function () {
    var model = new DM({foo:'bar'}, null );

    it('should have data set in constructor', function () {
        expect(model.get('foo')).to.equal('bar');
    });

    it('should set string', function () {
        model.set('bar', 'foo');
        expect(model.get('bar')).to.equal('foo');
    });

    it('should set number', function () {
        model.set('bar', 2);
        expect(model.get('bar')).to.equal(2);
    });
    it('should set boolean', function () {
        model.set('bar', true);
        expect(model.get('bar')).to.equal(true);
    });
    it('should set array', function () {
        model.set('bar', [1,2,3]);
        expect(model.get('bar')).to.deep.equal([1,2,3]);
    });
    it('should set object', function () {
        model.set('bar', {a : 'b', c : 'd'});
        expect(model.get('bar')).to.deep.equal({a : 'b', c : 'd'});
    });
    it('should set null', function () {
        model.set('bar', null);
        expect(model.get('bar')).to.equal(null);
    });

});

describe('Data Model Get/Set With Schema', function () {
    var model = new DM({foo : 'bar'}, testSchema );

    it('should NOT set invalid data set in constructor', function () {
        expect(model.get('foo')).to.equal(undefined);
    });

    model = new DM({number : 6}, testSchema);

    it('should  set valid data set in constructor', function () {
        expect(model.get('number')).to.equal(6);
    });

    it('should have a default value in "string" ', function () {
        expect(model.get('string')).to.equal('foo');
    });
    it('should NOT set data not for key in the schema', function () {
        model.set('bar', "foo");
        expect(model.get('bar')).to.not.equal('foo');
        expect(model.get('foo')).to.equal(undefined);
    });

    it('should set string', function () {
        model.set('string', 'foobar');
        expect(model.get('string')).to.equal('foobar');
    });

    it('should set number', function () {
        model.set('number', 2);
        expect(model.get('number')).to.equal(2);
    });
    it('should set boolean', function () {
        model.set('boolean', true);
        expect(model.get('boolean')).to.equal(true);
    });
    it('should set array', function () {
        model.set('array', [1,2,3]);
        expect(model.get('array')).to.deep.equal([1,2,3]);
    });
    it('should set object', function () {
        model.set('object', {a : 'b', c : 'd'});
        expect(model.get('object')).to.deep.equal({a : 'b', c : 'd'});
    });

});

describe('Data Model Set String', function () {

    beforeEach(function () {
        model.set('string', '');
    });

    var model = new DM({}, testSchema);
    it('should set string', function () {
        model.set('string', 'foobar');
        expect(model.get('string')).to.equal('foobar');
    });
    it('should not set number', function () {
        model.set('string', 3);
        expect(model.get('string')).to.equal('');
    });
    it('should not set boolean', function () {
        model.set('string', true);
        expect(model.get('string')).to.equal('');
    });
    it('should not set null', function () {
        model.set('string', null);
        expect(model.get('string')).to.equal('');
    });
    it('should not set array', function () {
        model.set('string', [1,2]);
        expect(model.get('string')).to.equal("");
    });
    it('should not set object', function () {
        model.set('string', {a : 'b'});
        expect(model.get('string')).to.equal("");
    });
    it('should not set regex', function () {
        model.set('string', /[^0-9]/);
        expect(model.get('string')).to.equal('');
    });
});

describe('Data Model Set Number', function () {

    beforeEach(function () {
        model.set('number', 0);
    });

    var model = new DM({}, testSchema);
    it('should not set string', function () {
        model.set('number', 'foobar');
        expect(model.get('number')).to.equal(0);
    });
    it('should set string', function () {
        model.set('number', '1');
        expect(model.get('number')).to.equal(1);
    });
    it('should set string with decimal', function () {
        model.set('number', '1.232');
        expect(model.get('number')).to.equal(1.232);
    });
    it('should set string with comma', function () {
        model.set('number', '1,000.3334');
        expect(model.get('number')).to.equal(1000.3334);
    });
    it('should set number', function () {
        model.set('number', 3);
        expect(model.get('number')).to.equal(3);
    });
    it('should not set boolean', function () {
        model.set('number', true);
        expect(model.get('number')).to.equal(0);
    });
    it('should not set null', function () {
        model.set('number', null);
        expect(model.get('number')).to.equal(0);
    });
    it('should not set array', function () {
        model.set('number', [1,2]);
        expect(model.get('number')).to.equal(0);
    });
    it('should not set object', function () {
        model.set('number', {a : 'b'});
        expect(model.get('number')).to.equal(0);
    });
    it('should not set regex', function () {
        model.set('number', /[^0-9]/);
        expect(model.get('number')).to.equal(0);
    });
});

describe('Data Model Set Boolean', function () {

    beforeEach(function () {
        model.set('boolean', false);
    });

    var model = new DM({}, testSchema);
    it('should not set string', function () {
        model.set('boolean', 'foobar');
        expect(model.get('boolean')).to.equal(false);
    });
    it('should set string true', function () {
        model.set('boolean', 'true');
        expect(model.get('boolean')).to.equal(true);
    });
    it('should set string 1', function () {
        model.set('boolean', '1');
        expect(model.get('boolean')).to.equal(true);
    });

    it('should set string true', function () {
        model.set('boolean', true);
        model.set('boolean', 'false');
        expect(model.get('boolean')).to.equal(false);
    });
    it('should set string 1', function () {
        model.set('boolean', true);
        model.set('boolean', '0');
        expect(model.get('boolean')).to.equal(false);
    });

    it('should not set number', function () {
        model.set('boolean', 3);
        expect(model.get('boolean')).to.equal(false);
    });
    it('should set boolean', function () {
        model.set('boolean', true);
        expect(model.get('boolean')).to.equal(true);
    });
    it('should not set null', function () {
        model.set('boolean', null);
        expect(model.get('boolean')).to.equal(false);
    });
    it('should not set array', function () {
        model.set('boolean', [1,2]);
        expect(model.get('boolean')).to.equal(false);
    });
    it('should not set object', function () {
        model.set('boolean', {a : 'b'});
        expect(model.get('boolean')).to.equal(false);
    });
    it('should not set regex', function () {
        model.set('boolean', /[^0-9]/);
        expect(model.get('boolean')).to.equal(false);
    });
});


describe('Data Model Set Array', function () {

    beforeEach(function () {
        model.set('array', []);
    });

    var model = new DM({}, testSchema);
    it('should not set string', function () {
        model.set('array', 'foobar');
        expect(model.get('array')).to.deep.equal([]);
    });
    it('should not set number', function () {
        model.set('array', 3);
        expect(model.get('array')).to.deep.equal([]);
    });
    it('should not set boolean', function () {
        model.set('array', true);
        expect(model.get('array')).to.deep.equal([]);
    });
    it('should not set null', function () {
        model.set('array', null);
        expect(model.get('array')).to.deep.equal([]);
    });
    it('should set array', function () {
        model.set('array', [1,2]);
        expect(model.get('array')).to.deep.equal([1,2]);
    });
    it('should not set object', function () {
        model.set('array', {a : 'b'});
        expect(model.get('array')).to.deep.equal([]);
    });
    it('should not set regex', function () {
        model.set('array', /[^0-9]/);
        expect(model.get('array')).to.deep.equal([]);
    });
});


describe('Data Model Set Object', function () {

    beforeEach(function () {
        model.set('object', {});
    });

    var model = new DM({}, testSchema);
    it('should not set string', function () {
        model.set('object', 'foobar');
        expect(model.get('object')).to.deep.equal({});
    });
    it('should not set number', function () {
        model.set('object', 3);
        expect(model.get('object')).to.deep.equal({});
    });
    it('should not set boolean', function () {
        model.set('object', true);
        expect(model.get('object')).to.deep.equal({});
    });
    it('should not set null', function () {
        model.set('object', null);
        expect(model.get('object')).to.deep.equal({});
    });
    it('should set array', function () {
        model.set('object', [1,2]);
        expect(model.get('object')).to.deep.equal({});
    });
    it('should not set object', function () {
        model.set('object', {a : 'b'});
        expect(model.get('object')).to.deep.equal({a : 'b'});
    });
    it('should not set regex', function () {
        model.set('object', /[^0-9]/);
        expect(model.get('object')).to.deep.equal({});
    });
});

describe('Data Model Set Regex', function () {

    beforeEach(function () {
        model.set('regex', /.*/);
    });

    var model = new DM({}, testSchema);
    it('should not set string', function () {
        model.set('regex', 'foobar');
        expect(model.get('regex')).to.deep.equal(/.*/);
    });
    it('should not set number', function () {
        model.set('regex', 3);
        expect(model.get('regex')).to.deep.equal(/.*/);
    });
    it('should not set boolean', function () {
        model.set('regex', true);
        expect(model.get('regex')).to.deep.equal(/.*/);
    });
    it('should not set null', function () {
        model.set('regex', null);
        expect(model.get('regex')).to.deep.equal(/.*/);
    });
    it('should set array', function () {
        model.set('regex', [1,2]);
        expect(model.get('regex')).to.deep.equal(/.*/);
    });
    it('should not set object', function () {
        model.set('regex', {a : 'b'});
        expect(model.get('regex')).to.deep.equal(/.*/);
    });
    it('should not set regex', function () {
        model.set('regex', /[^0-9]/);
        expect(model.get('regex')).to.deep.equal(/[^0-9]/);
    });
});

describe('Data Model Set nested object', function () {
    var model = new DM({});
    beforeEach(function () {
        model._model = {};
    });

    it('should set deep nested object', function () {
        model.set('foo.bar', 'foobar');
        expect(model.get('foo')).to.deep.equal( {bar : 'foobar'});
        expect(model.get('foo.bar')).to.equal('foobar');

    });

    it('should set deep nested object as array', function () {
        model.set('foo["foo"]', 'foofoo');
        expect(model.get('foo')).to.deep.equal( {foo : 'foofoo'});
        expect(model.get('foo.foo')).to.equal('foofoo');

    });

    it('should set deep nested object as array', function () {
        model.set('foo["foo"].bar', 'foofoobar');
        expect(model.get('foo')).to.deep.equal( { foo : {bar : 'foofoobar'}});
        expect(model.get('foo.foo.bar')).to.equal('foofoobar');

    });

    it('should set value set from object.object.object', function () {
        model.set("a.b.x", "hello");
        expect(model.get("a.b.x")).to.equal("hello");
        expect(model.get('a')).to.deep.equal({b:{x:"hello"}});
    });


    it('should set value set from object.array', function () {
        model.set("a.b[0]", "hello");
        expect(model.get("a.b[0]")).to.equal("hello");
        expect(model.get('a')).to.deep.equal({b:["hello"]});
    });

    it('should set value set from object.object.object.array', function () {
        model.set("a.b.x.y[0]", "hello");
        expect(model.get("a.b.x.y[0]")).to.equal("hello");
        expect(model.get('a')).to.deep.equal({b:{x:{y:["hello"]}}});
    })

    it('should set value set from object.array.object', function () {
        model.set("a.b[0].c", "hello");
        expect(model.get("a.b[0].c")).to.equal("hello");
        expect(model.get("a.b[0]")).to.deep.equal({c : "hello"});
//        expect(model.get('a')).to.deep.equal({b:[{c:"hello"}]});
    });

    it('should set value set from object.array.object.object', function () {
        model.set("a.b[0].c.d", "hello");
        expect(model.get("a.b[0].c.d")).to.equal("hello");
        expect(model.get("a.b[0].c")).to.deep.equal({d : "hello"});

    })

    it('should set value set from object.array.object.object', function () {
        model.set("a.b[0].c.d[0]", "hello");
        expect(model.get("a.b[0].c.d[0]")).to.equal("hello");
        expect(model.get("a.b[0].c.d")).to.deep.equal(["hello"]);

    })

    it('should set value set from object.array.object.object', function () {
        model.set("a.b[0].c[0].d[0]", "hello");
        expect(model.get("a.b[0].c[0].d[0]")).to.equal("hello");
        expect(model.get("a.b[0].c[0].d")).to.deep.equal([ "hello"] );

    });

    it('should set value set from object.array.object.object', function () {
        model.set("a.b[0].c[0].d[0].e.f", "hello");
        expect(model.get("a.b[0].c[0].d[0].e.f")).to.equal("hello");
        expect(model.get("a.b[0].c[0].d[0].e")).to.deep.equal({f : "hello"});
    });

    it('should set value set from object.array.object.object', function () {
        model.set("a.b['foo'].c[0].d[0].e.f", "hello");
        expect(model.get("a.b['foo'].c[0].d[0].e.f")).to.equal("hello");
        expect(model.get("a.b['foo'].c[0].d[0].e")).to.deep.equal({f : "hello"});
    });

    it('should set value set from object.array.object.object', function () {
        model.set("a.b['foo'].c[0].d['bar'].e.f", "hello");
        expect(model.get("a.b['foo'].c[0].d['bar'].e.f")).to.equal("hello");
        expect(model.get("a.b['foo'].c[0].d['bar'].e")).to.deep.equal({f : "hello"});
    });

});


describe('Data Model x-contamination', function () {
    model1 = new DM({number : 6}, testSchema);
    model1._model.array[0] = "foo";
    model1._model.array[1] = "bar";
    model1._model.array[2] = "uber";
    model1._model.string = 'hello';
    model1._model.boolean= true;
    model1._model.number= 4;
    model1._model.object.foo = 'bar';

    model2 = new DM({}, testSchema);
    it('should not x-contaminate data', function () {
        expect(model2.get('array')).to.not.deep.equal(["foo", "bar", "uber"]);
        expect(model2.get('object')).to.not.deep.equal({foo : 'bar'});
        expect(model2.get('string')).to.not.equal('hello');
        expect(model2.get('boolean')).to.not.equal(true);
        expect(model2.get('number')).to.not.equal(4);

    });
});

