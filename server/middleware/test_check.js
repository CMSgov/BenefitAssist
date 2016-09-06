'use strict';

/*
 * Middleware to capture the presence of a test flag
 * Test flag can be a parameter of test_mode=true in the query string OR
 * a header with the name of test and the value of TEST
 *
 * This middleware will inject a flag into the request object if applicable
 *      test=true
 */
module.exports = function (req, resp, next) {

    // get the authorization header
    var testHeader = req.headers.test == "TEST";
    var testmode = (req.params.test_mode == 'true');

    req.test = testHeader || testmode;

    next();

};

