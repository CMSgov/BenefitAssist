var _ = require('lodash');
var tableHelper = require('../tableHelper');

var liheap_limits = {
    "income" : {
        "_COMMENT" : "http://www.benefits.gov/benefits/browse-by-category/category/ENA",
        "*" : { // 1.5 FPL
            annualIncomeLimitsPerPerson : [17655, 23895, 30135, 36375, 42615, 48855, 55095, 61335],
            additionalIncomePerPerson : 6240
        },
        "AK" : {
            annualIncomeLimitsPerPerson : [22080, 29880, 37680, 45480, 53280, 61080, 68880, 76680],
            additionalIncomePerPerson : 7800
        },
        "AZ" : {
            annualIncomeLimitsPerPerson : [23540, 31860, 40180, 48500, 56820, 65140, 73460, 81780],
            additionalIncomePerPerson : 8320
        },
        "CA" : {
            annualIncomeLimitsPerPerson : [23963, 31336, 38709, 46082, 53456, 60829, 62211, 63594],
            additionalIncomePerPerson : 1382
        },
        "DE" : {
            annualIncomeLimitsPerPerson : [23540, 31860, 40180, 48500, 56820, 65140, 73460, 81780],
            additionalIncomePerPerson : 8320
        },
        "GA" : {
            annualIncomeLimitsPerPerson : [21180, 27697, 34214, 40731, 47248, 53765, 54987, 56209],
            additionalIncomePerPerson : 1222
        },
        "HI" : {
            annualIncomeLimitsPerPerson : [20325, 27495, 34665, 41835, 49005, 56175, 63345, 70515],
            additionalIncomePerPerson : 7170
        },
        "KS" : {
            annualIncomeLimitsPerPerson : [15301, 20709, 26117, 31525, 36933, 42341, 47749, 53157],
            additionalIncomePerPerson : 5408
        },
        "LA" : {
            annualIncomeLimitsPerPerson : [21688, 28362, 35035, 41708, 48382, 55055, 56306, 57558],
            additionalIncomePerPerson : 1251
        },
        "MD" : {
            annualIncomeLimitsPerPerson : [21688, 27878, 35158, 42438, 49718, 56998, 64278, 71558],
            additionalIncomePerPerson : 7280
        },
        "MA" : {
            annualIncomeLimitsPerPerson : [32618, 42654, 52691, 62727, 72763, 82800, 84681, 86563],
            additionalIncomePerPerson : 1882
        },
        "MI" : {
            annualIncomeLimitsPerPerson : [12947, 17523, 22099, 26675, 31251, 35827, 40403, 44979],
            additionalIncomePerPerson : 4576
        },
        "MN" : {
            annualIncomeLimitsPerPerson : [23354, 30540, 37726, 44912, 52098, 59284, 60631, 61979],
            additionalIncomePerPerson : 1347
        },
        "MS" : {
            annualIncomeLimitsPerPerson : [17651, 23082, 28513, 33944, 39375, 44806, 45824, 46842],
            additionalIncomePerPerson : 1018
        },
        "MO" : {
            annualIncomeLimitsPerPerson : [15890, 21506, 27122, 32738, 38354, 43970, 49586, 55202],
            additionalIncomePerPerson : 5616
        },
        "MT" : {
            annualIncomeLimitsPerPerson : [21702, 28379, 35057, 41734, 48412, 55089, 56341, 57593],
            additionalIncomePerPerson : 1252
        },
        "NE" : {
            annualIncomeLimitsPerPerson : [13653, 17778, 22420, 27063, 31706, 36348, 40991, 45633],
            additionalIncomePerPerson : 4643
        },
        "NH" : {
            annualIncomeLimitsPerPerson : [23540, 31860, 40180, 48500, 56820, 65140, 73460, 81780],
            additionalIncomePerPerson : 8320
        },
        "NJ" : {
            annualIncomeLimitsPerPerson : [23540, 31860, 40180, 48500, 56820, 65140, 73460, 81780],
            additionalIncomePerPerson : 8320
        },
        "NC" : {
            annualIncomeLimitsPerPerson : [15301, 20709, 26117, 31525, 36933, 42341, 47749, 53157],
            additionalIncomePerPerson : 5408
        },
        "ND" : {
            annualIncomeLimitsPerPerson : [26885, 35157, 43430, 51702, 59974, 68247, 69798, 71349],
            additionalIncomePerPerson : 1551
        },
        "OH" : {
            annualIncomeLimitsPerPerson : [23459, 30677, 37895, 45113, 52331, 59549, 60902, 62256],
            additionalIncomePerPerson : 1353
        },
        "OK" : {
            annualIncomeLimitsPerPerson : [12947, 17523, 22099, 26675, 31251, 35827, 40403, 44979],
            additionalIncomePerPerson : 4576
        },
        "OR" : {
            annualIncomeLimitsPerPerson : [21506, 28123, 34740, 41357, 47975, 54592, 55832, 57073],
            additionalIncomePerPerson : 1241
        },
        "RI" : {
            annualIncomeLimitsPerPerson : [27951, 36551, 45152, 53752, 62353, 70953, 72565, 74178],
            additionalIncomePerPerson : 1613
        },
        "SD" : {
            annualIncomeLimitsPerPerson : [20598, 27878, 35158, 42438, 49718, 56998, 64278, 71558],
            additionalIncomePerPerson : 7280
        },
        "TX" : {
            annualIncomeLimitsPerPerson : [14713, 19913, 25113, 30313, 35513, 40713, 45913, 51113],
            additionalIncomePerPerson : 6090
        },
        "UT" : {
            annualIncomeLimitsPerPerson : [14713, 19913, 25113, 30313, 35513, 40713, 45913, 51113],
            additionalIncomePerPerson : 5200
        },
        "VA" : {
            annualIncomeLimitsPerPerson : [15301, 20709, 26117, 31525, 36933, 42341, 47749, 53157],
            additionalIncomePerPerson : 5408
        },
        "WA" : {
            annualIncomeLimitsPerPerson : [14713, 19913, 25113, 30313, 35513, 40713, 45913, 51113],
            additionalIncomePerPerson : 5200
        },
        "WV" : {
            annualIncomeLimitsPerPerson : [15301, 20709, 26117, 31525, 36933, 42341, 47749, 53157],
            additionalIncomePerPerson : 5408
        },
        "WI" : {
            annualIncomeLimitsPerPerson : [25151, 32890, 40628, 48367, 56106, 63845, 65296, 66747],
            additionalIncomePerPerson : 1451
        },
        "WY" : {
            annualIncomeLimitsPerPerson : [23876, 31223, 38569, 45916, 53262, 60609, 61986, 63364],
            additionalIncomePerPerson : 1377
        }
    }
};


module.exports = {
    //getFPLLimit : function (state) {
    //    return tableHelper.getValue(liheap_limits.fpl, state);
    //},

    getIncomeLimit : function (state, householdSize) {
        return tableHelper.getIncomeLevel(liheap_limits.income, householdSize, state, 'annualIncomeLimitsPerPerson', 'additionalIncomePerPerson');
    }
};
