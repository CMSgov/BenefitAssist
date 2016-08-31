var tableHelper = require('../tableHelper');

/**
 * State codes mapped to qualification by state for Medicaid as FPL Percent tuples: (CA: [Parent, NonParent])
 * http://kff.org/health-reform/state-indicator/medicaid-income-eligibility-limits-for-adults-as-a-percent-of-the-federal-poverty-level/
 */
var medicaid_config = {
    //
    fpl : {
        '*' : [1.38, 1.38],
        'AK' : [1.43, 1.38],
        'AL' : [0.18, 0],
        'CT' : [1.55, 1.38],
        'DC' : [2.21, 2.15],
        'FL' : [0.34, 0],
        'GA' : [0.37, 0],
        'ID' : [0.26, 0],
        'IN' : [1.39, 1.39],
        'KS' : [0.38, 0],
        'LA' : [0.24, 0],
        'ME' : [1.05, 0],
        'MO' : [0.22, 0],
        'MS' : [0.27, 0],
        'NC' : [0.44, 0],
        'NE' : [0.63, 0],
        'OK' : [0.44, 0],
        'SC' : [0.67, 0],
        'SD' : [0.52, 0],
        'TN' : [1.01, 0],
        'TX' : [0.18, 0],
        'UT' : [0.45, 0],
        'VA' : [0.39, 0],
        'WI' : [1, 1],
        'WY' : [0.57, 0]
    }
};

//    /** State codes mapped to qualification by state for Medicaid Gap as FPL Percent tuples: (CA: [start, end])
//     * -1 means that state does not have a qualifying GAP scenario
//     *    This is common for non-parents. i.e. in Alabama if you are in the range of 0-100 of FPL
//     *      and you are a non-parent, you will ALWAYS fall in the GAP.
//     */
//    MedicaidGapPercentByState : {
//        'AK' : [1.29, -1],
//        'AL' : [0.13, -1],
//        'FL' : [0.31, -1],
//        'GA' : [0.36, -1],
//        'ID' : [0.24, -1],
//        'IN' : [0.20, -1],
//        'KS' : [0.33, -1],
//        'LA' : [0.19, -1],
//        'ME' : [1.00, -1],
//        'MS' : [0.24, -1],
//        'MO' : [0.20, -1],
//        'MT' : [0.48, -1],
//        'NC' : [0.46, -1],
//        'NE' : [0.63, -1],
//        'NH' : [0.70, -1],
//        'OK' : [0.43, -1],
//        'PA' : [0.33, -1],
//        'SC' : [0.62, -1],
//        'SD' : [0.54, -1],
//        'TN' : [1.06, -1],
//        'TX' : [0.15, -1],
//        'UT' : [0.46, -1],
//        'VA' : [0.49, -1],
//        'WI' : [0.95, 0.95],
//        'WY' : [0.57, -1]
//    }
//};

module.exports = {
    getFPLLimit : function (state, kids) {
        return tableHelper.getValue(medicaid_config.fpl, state)[(kids ? 0 : 1)];
    }
};
