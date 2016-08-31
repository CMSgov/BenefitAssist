"use strict";
var _ = require('lodash');

var States = [
    {code : "AL", name : "Alabama", zipRanges : ["35000-35299", "35400-36999"]},
    {code : "AK", name : "Alaska", zipRanges : ["99500-99999"]},
    {code : "AZ", name : "Arizona", zipRanges : ["85000-85399", "85500-85799", "85900-86099", "86300-86599"]},
    {code : "AR", name : "Arkansas", zipRanges : ["71600-72999"]},
    {code : "CA", name : "California", zipRanges : ["90000-90899", "91000-92899", "93000-96199"]},
    {code : "CO", name : "Colorado", zipRanges : ["80000-81699"]},
    {code : "CT", name : "Connecticut", zipRanges : ["06000-06999"]},
    {code : "DC", name : "D.C.", zipRanges : ["20000-20099", "20200-20599", "56900-56999"]},
    {code : "DE", name : "Delaware", zipRanges : ["19700-19999"]},
    {code : "FL", name : "Florida", zipRanges : ["32000-33999", "34100-34999"]},
    {code : "GA", name : "Georgia", zipRanges : ["30000-31999", "39800-39999"]},
    {code : "HI", name : "Hawaii", zipRanges : ["96700-96899"]},
    {code : "ID", name : "Idaho", zipRanges : ["83200-83899"]},
    {code : "IL", name : "Illinois", zipRanges : ["60000-62099", "62200-62999"]},
    {code : "IN", name : "Indiana", zipRanges : ["46000-47999"]},
    {code : "IA", name : "Iowa", zipRanges : ["50000-51699", "52000-52899"]},
    {code : "KS", name : "Kansas", zipRanges : ["66000-66299", "66400-67999"]},
    {code : "KY", name : "Kentucky", zipRanges : ["40000-42799"]},
    {code : "LA", name : "Louisiana", zipRanges : ["70000-70199", "70300-70899", "71000-71499"]},
    {code : "ME", name : "Maine", zipRanges : ["03900-04999"]},
    {code : "MD", name : "Maryland", zipRanges : ["20600-21299", "21400-21999"]},
    {code : "MA", name : "Massachusetts", zipRanges : ["01000-02799", "05500-05599"]},
    {code : "MI", name : "Michigan", zipRanges : ["48000-49999"]},
    {code : "MN", name : "Minnesota", zipRanges : ["55000-55199", "55300-56799"]},
    {code : "MS", name : "Mississippi", zipRanges : ["38600-39799"]},
    {code : "MO", name : "Missouri", zipRanges : ["63000-63199", "63300-64199", "64400-65899"]},
    {code : "MT", name : "Montana", zipRanges : ["59000-59999"]},
    {code : "NE", name : "Nebraska", zipRanges : ["68000-68199", "68300-69399"]},
    {code : "NV", name : "Nevada", zipRanges : ["88900-89199", "89300-89599", "89700-89899"]},
    {code : "NH", name : "New Hampshire", zipRanges : ["03000-03899"]},
    {code : "NJ", name : "New Jersey", zipRanges : ["07000-08999"]},
    {code : "NM", name : "New Mexico", zipRanges : ["87000-87199", "87300-87599", "87700-88499"]},
    {code : "NY", name : "New York", zipRanges : ["00499", "00500-00599", "06390", "10000-14999"]},
    {code : "NC", name : "North Carolina", zipRanges : ["27000-28999"]},
    {code : "ND", name : "North Dakota", zipRanges : ["58000-58899"]},
    {code : "OH", name : "Ohio", zipRanges : ["43000-45999"]},
    {code : "OK", name : "Oklahoma", zipRanges : ["73000-73199", "73400-74199", "74300-74999"]},
    {code : "OR", name : "Oregon", zipRanges : ["97000-97999"]},
    {code : "PA", name : "Pennsylvania", zipRanges : ["15000-19699"]},
    {code : "RI", name : "Rhode Island", zipRanges : ["02800-02999"]},
    {code : "SC", name : "South Carolina", zipRanges : ["29000-29999"]},
    {code : "SD", name : "South Dakota", zipRanges : ["57000-57799"]},
    {code : "TN", name : "Tennessee", zipRanges : ["37000-38599"]},
    {code : "TX", name : "Texas", zipRanges : ["73300-73399", "75000-77099", "77200-79999", "88500-88599"]},
    {code : "UT", name : "Utah", zipRanges : ["84000-84799"]},
    {code : "VT", name : "Vermont", zipRanges : ["05000-05499", "05600-05999"]},
    {code : "VA", name : "Virginia", zipRanges : ["20100-20199", "22000-24699"]},
    {code : "WA", name : "Washington", zipRanges : ["98000-98699", "98800-99499"]},
    {code : "WV", name : "West Virginia", zipRanges : ["24700-26899"]},
    {code : "WI", name : "Wisconsin", zipRanges : ["53000-53299", "53400-53599", "53700-54999"]},
    {code : "WY", name : "Wyoming", zipRanges : ["82000-83199", "83400-83499"]}
];

var Territories = [
    {code : "AS", name : "American Samoa", zipRanges : ["96799"]},
    {code : "FM", name : "Federated States of Micronesia", zipRanges : ["96900-96999"]},
    {code : "GU", name : "Guam", zipRanges : ["96910-96939"]},
    {code : "MH", name : "Marshall Islands", zipRanges : ["96900-96999"]},
    {code : "MP", name : "Northern Marianas", zipRanges : ["96950-96959"]},
    {code : "PR", name : "Puerto Rico", zipRanges : ["00600-00799", "00900-00999"]},
    {code : "PW", name : "Palau", zipRanges : ["96900-96999"]},
    {code : "VI", name : "Virgin Islands", zipRanges : ["00800-00899"]}
];

var Military = [
    {code : "AA", name : "Armed Forces (the) Americas", zipRanges : ["34000-34099"]},
    {code : "AE", name : "Armed Forces Europe", zipRanges : ["09000-09899"]},
    {code : "AP", name : "Armed Forces Pacific", zipRanges : ["96200-96699"]}
];


var StateLen = States.length,
    TerritoriesLen = Territories.length;

var stateCode = {

    getStates : function () {
        return States;
    },

    toStateCode : function (name) {
        var i;

        if (name) {
            name = name.toLowerCase();

            for (i = 0; i < StateLen; i++) {
                if (States[i]['name'].toLowerCase() === name) {
                    return States[i]['code'];
                }
            }

            for (i = 0; i < TerritoriesLen; i++) {
                if (Territories[i]['name'].toLowerCase() === name) {
                    return Territories[i]['code'];
                }
            }
        }

        return "";
    },

    toStateName : function (code) {
        var i;

        if (code) {
            code = code.toUpperCase();

            for (i = 0; i < StateLen; i++) {
                if (States[i]['code'] === code) {
                    return States[i]['name'];
                }
            }

            for (i = 0; i < TerritoriesLen; i++) {
                if (Territories[i]['code'] === code) {
                    return Territories[i]['name'];
                }
            }

            for (i = 0; i < Military; i++) {
                if (Military[i]['code'] === code) {
                    return Military[i]['name'];
                }
            }
        }

        return "";
    },

    isTerritoryZip : function (zipcode) {
        var info = null;

        if (zipcode) {
            zipcode = parseInt(zipcode);

            _.each(Territories, function (state) {
                if (_isInZipRange(zipcode, state)) {
                    info = state
                }
            });
        }

        return info;
    },

    isMilitaryZip : function (zipcode) {
        var info = null;

        if (zipcode) {
            zipcode = parseInt(zipcode);

            _.each(Military, function (state) {
                if (_isInZipRange(zipcode, state)) {
                    info = state
                }
            });
        }

        return info;
    }

};

function _isInZipRange(zipcode, state) {
    var found = false;
    _.each(state.zipRanges, function (range) {
        var bounds = range.split('-');
        var lower = parseInt(bounds[0]), upper = bounds[1] ? parseInt(bounds[1]) : lower;
        if (zipcode >= lower && zipcode <= upper) {
            found = true;
        }
    });
    return found;
}


module.exports = stateCode;
