var searchSchema = require('../schemas/benefitSearchSchema');
var DataModel = require('../dataModel');
var _ = require('lodash');


module.exports = DataModel.extend({
    construct : function (inData, testmode) {
        this._super(inData, searchSchema);
        this._test = !!testmode;
        if (inData && _.size(inData) > 0) {
            normalize(this);
        }
    },

    isTestMode : function () {
        return !!(this._test);
    }
});


function normalize (self) {

    if (!self._model.lastMonthTotalIncome) {
        self.set('lastMonthTotalIncome', (self._model.lastMonthIncome || 0) + (self._model.lastMonthOtherIncome || 0));
    }
    self.set('annualTotalIncome', (self._model.lastMonthTotalIncome || 0) * 12);

    if (!self._model.householdMaxAge) {
        self.set('householdMaxAge', Math.max(self._model.age || 0, self._model.spouseAge || 0));
    }

    if (!self._model.householdSize) {
        self.set('householdSize', _calcHouseholdTotal());
    }


    function _calcHouseholdTotal () {
        var count = 1;
        if (self._model.spouseAge) {
            count += 1;
        }
        if (self._model.childAges) {
            count += self._model.childAges.length;
        }
        if (self._model.numOthers) {
            count += self._model.numOthers;
        }
        return count;

    }

}