/**
 * Created by npatwardhan on 7/1/15.
 */

var noCache = function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    return next();
}

module.exports = noCache;
