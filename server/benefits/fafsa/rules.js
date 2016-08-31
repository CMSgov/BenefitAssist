var _ = require('lodash');

module.exports = {
    getRules : function (model) {
        return _.values(baseRules);
    }
};


var baseRules = {
    //"taxpayer" : {
    //    "priority" : 1,
    //    "name" : "TaxPayer Age",
    //    "desc" : "Tax payer is between 16 and 22",
    //    "benefit" : "fafsa",
    //    "condition" : function (RE) {
    //        RE.when(this.age >= 16 && this.age <= 22);
    //    },
    //    "consequence" : function (RE) {
    //        this.results.passed = true;
    //        RE.stop();
    //    }
    //},

    //"spouse" : {
    //    "priority" : 1,
    //    "name" : "Spouse Age",
    //    "desc" : "Spouse is between 16 and 22",
    //    "benefit" : "fafsa",
    //    "condition" : function (RE) {
    //        RE.when(this.married && this.spouseAge >= 16 && this.spouseAge <= 22);
    //    },
    //    "consequence" : function (RE) {
    //        this.results.passed = true;
    //        RE.stop();
    //    }
    //},
    //
    //"dependents" : {
    //    "priority" : 1,
    //    "name" : "Dependents Age",
    //    "desc" : "A Dependent is between 16 and 22",
    //    "benefit" : "fafsa",
    //    "condition" : function (RE) {
    //        var childs = this.childAges;
    //        var found = false;
    //        if(childs) {
    //            _.each(childs, function (age) {
    //                if(age >= 16 && age <= 22) {
    //                    found = true;
    //                }
    //            });
    //        }
    //        RE.when(found);
    //    },
    //    "consequence" : function (RE) {
    //        this.results.passed = true;
    //        RE.stop();
    //    }
    //},

    "student" : {
        "priority" : 1,
        "name" : "Tuition",
        "desc" : "Tuition Paid",
        "benefit" : "fafsa",
        "condition" : function (RE) {
            RE.when(this.isStudent);
        },
        "consequence" : function (RE) {
            this.results.passed = true;
            RE.stop();
        }
    },

    "educationCredit" : {
        "priority" : 1,
        "name" : "educationCredit",
        "desc" : "Education Credit Paid",
        "benefit" : "fafsa",
        "condition" : function (RE) {
            RE.when(this.educationCredit);
        },
        "consequence" : function (RE) {
            this.results.passed = true;
            RE.stop();
        }
    },

    "hopeCredit" : {
        "priority" : 1,
        "name" : "hopeCredit",
        "desc" : "Hope Credit Paid",
        "benefit" : "fafsa",
        "condition" : function (RE) {
            RE.when(this.hopeCredit);
        },
        "consequence" : function (RE) {
            this.results.passed = true;
            RE.stop();
        }
    },
    "fail" : {
        "condition" : function (RE) {
            RE.when(true);
        },
        "consequence" : function (RE) {
            this.results.passed = false;
            RE.stop();
        }
    }
};
