//-------------
// Utility function to deep merge into target obj where source takes precedence
// returns updated tarqet object
var _ = require('lodash');
module.exports = function mergeObjects (target, source, dontAllowNewKeysInTarget) {
    var newObj = _.cloneDeep(target);

    _.each(source, function (p, idx) {

        try {
            // Property in destination object set; update its value.
            if (_.isObject(p) && !_.isArray(p) && !_.isFunction(p)) {
                newObj[idx] = mergeObjects(newObj[idx], p, dontAllowNewKeysInTarget);
            }
            else {
                newObj[idx] = p;
            }
        }
        catch (e) { // Property in target object not set; create it and set its value.

            if (!dontAllowNewKeysInTarget) {
                newObj[idx] = p;
            }
        }
    });

    return newObj;

};