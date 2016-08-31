/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * Inspired by base2 and Prototype
 * MIT Licensed.
 *
 * LB: Modified to be strict-mode compliant
 */

/* This is just a quick & dirty way to check if "function decompilation" works.
 * The RegExp.prototype.test method will take the argument and it will convert it to String, the 'mojo' reference inside the function is never evaluated.
 *
 * Why would you have to check this?
 *
 * Because the Function.prototype.toString method returns an implementation-dependent representation of a function,
 * and in some implementations, such older Safari versions, Mobile Opera, and some Blackberry browsers, they don't actually return anything useful.
 *
 */
var fnTest = /xyz/.test(function () {
    return "xyz";
}) ? /\b_super\b/ : /.*/;
var initializing = false;

// The base Class implementation (does nothing)
var Class = function () {
};

// Create a new Class that inherits from this class
Class.extend = function extend (prop) {  // LB: name the function so we don't have to refer to callee to make the class extendable
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == "function" &&
                          typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function (name, fn) {
                return function () {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) :   // jshint ignore:line
            prop[name];
    }

    // The dummy class constructor
    function Class () {
        if (!initializing) {
            // All construction is actually done in the 'construct' method
            if (this.construct) {
                this.construct.apply(this, arguments);
            }
        }
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extend-able
    Class.extend = extend;

    return Class;
};

module.exports = Class;