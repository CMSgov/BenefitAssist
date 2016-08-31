'use strict';

module.exports = function (req, resp, next) {

    // get the authorization header
    var testHeader = req.headers.test == "TEST";
    var testmode = (req.params.test_mode == 'true');

    req.test = testHeader || testmode;

    next();

};

