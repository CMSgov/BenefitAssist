var StandardDeduction48 = [155, 155, 155, 165, 193, 221],
    StandardDeductionAK = [266, 266, 266, 266, 266, 277],
    StandardDeductionHI = [219, 219, 219, 219, 222, 255],
    MaxStandardDeductionSize = StandardDeduction48.length;

// Maximum allowable shelter deduction
var ShelterDeduction48 = 490,
    ShelterDeductionAK = 782,
    ShelterDeductionHI = 660;

var Allowance = [194, 357, 511, 649, 771, 925, 1022, 1169],
    AllowanceAdditional = 146,
    MaxAllowanceHouseholdSize = Allowance.length;

module.exports = {
    getSavings : function (model) {
        var state = model.get("state"),
            householdSize = model.get('householdSize'),
            allowanceHouseholdSize = Math.min(MaxAllowanceHouseholdSize, householdSize),
            allowanceAdditionalSize = Math.max(0, householdSize - MaxAllowanceHouseholdSize),
            grossIncome = model.get('annualTotalIncome') / 12,
            netIncome = grossIncome,
            childcarePaid = model.get('childcarePaid'),
            maxAllowance = Allowance[allowanceHouseholdSize - 1] + (allowanceAdditionalSize * AllowanceAdditional),
            high = maxAllowance,
            low;

        // fix inconsistencies with state
        state = state ? state.toUpperCase() : "";

        // Calculate the monthly net income (subtract deductions)
        //
        // Subtract standard deduction
        netIncome -= calcStandardDeduction(householdSize, state);

        // Subtract earnings deduction (20% of gross income)
        netIncome -= grossIncome * 0.2;

        // Subtract monthly child care cost
        if (model.get('numKids') && model.get('childcare') && childcarePaid) {
            netIncome -= (childcarePaid / 12);
        }

        // Subtract shelter deduction
        netIncome -= calcShelterDeduction(state);

        // Subtract 30% of net income from max allocation
        high -= netIncome * 0.3;

        // Round to lowest ten
        high = Math.floor(high / 10) * 10;

        // Minimum amount of $16 for household size of one or two
        // No minimum for households size greater than two
        if (householdSize < 3) {
            // Round up $16 to $20
            high = Math.max(20, high);
        }

        high = Math.max(0, Math.min(high, maxAllowance));

        low = high * 0.7;
        low = Math.floor(low / 10) * 10;

        return {
            low : low,
            high : high
        };
    }
};

/**
 * @return {number}
 * @protected
 */
function calcStandardDeduction (householdSize, state) {
    var standardDeductionIndex = Math.min(householdSize, MaxStandardDeductionSize) - 1;

    switch (state) {
        case 'AK':
            return StandardDeductionAK[standardDeductionIndex];

        case 'HI':
            return StandardDeductionHI[standardDeductionIndex];
    }

    return StandardDeduction48[standardDeductionIndex];
}

/**
 * @return {number}
 * @protected
 */
function calcShelterDeduction (state) {
    var deduction = ShelterDeduction48;

    switch (state) {
        case 'AK':
            deduction = ShelterDeductionAK;
            break;

        case 'HI':
            deduction = ShelterDeductionHI;
            break;
    }

    return deduction * 0.7;
}