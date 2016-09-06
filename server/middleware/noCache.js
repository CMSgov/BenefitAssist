/**
 * Created by npatwardhan on 7/1/15.
 */


/*
 * Middleware to not cache the request
 */
module.exports = function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    return next();
};
