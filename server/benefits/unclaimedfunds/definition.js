var stateCode = require('../../util/stateCode');
var constants = require('../../config/constants');
var merge = require('../../util/objectMerge');
var _ = require('lodash');

module.exports = {
    getDefinition : function (model) {
        var state = model.get('state');
        var stateDef = {};
        if (state) {
            stateDef = Defs[state] || {};
        }
        return merge(Defs["*"], stateDef);
    }
};

var Defs = {
    "*" : {
        name : 'Unclaimed Money',
        desc : function (model) {
            return stateCode.toStateName(model.get('state')) + ' requires financial institutions and insurance companies to report and turn over unclaimed property to the state.';
        },
        nextSteps : 'Identify the unclaimed money that&rsquo;s in your name and complete the application.',
        actionLabel : 'Redeem online',
        unknownAmount : true,
        sponsor : 'Missing Money',
        url : 'https://missingmoney.com',
        applicationType : 'online',
        savingsLabel : 'Find your money',
        savingsNote : 'right now'

    },
    "AK" : {
//        sponsor : 'Alaska Department of Revenue'
    },
    "AL" : {
//        sponsor : 'Alabama State Treasury'
    },
    "AR" : {
        sponsor : 'Arkansas State Auditor',
        url : 'https://www.ark.org/auditor/unclprop/index.php/search/searchCrit',
        applicationType: 'webkick'
    },
    "AZ" : {
//        sponsor : 'Arizona Department of Revenue'
    },
    "CA" : {
        sponsor : 'California State Controller',
        url : 'https://ucpi.sco.ca.gov/UCP/',
        applicationType: 'webkick'
    },
    "CO" : {
//        sponsor : 'Colorado State Treasury'
    },
    "CT" : {
        url : 'http://www.ctbiglist.com/',
        sponsor : 'Connecticut State Treasury',
        applicationType: 'webkick'
    },
    "DC" : {
//        sponsor : 'D.C. Office of Finance and Treasury'
    },
    "DE" : {
        sponsor : 'Delaware Division of Revenue',
        nextSteps : 'Verify that you recognize the unclaimed money that&rsquo;s in your name. Print and complete the application.',
        actionLabel : 'Print application',
        url : 'https://delaware.findyourunclaimedproperty.com/app/claim-search',
        applicationType: 'webkick'
    },
    "FL" : {
//        sponsor : 'Florida Department of Financial Services'
    },
    "GA" : {
        sponsor : 'Georgia Department of Revenue',
        url : 'https://etax.dor.ga.gov/unclaimedproperty/main.aspx',
        applicationType: 'webkick'
    },
    "HI" : {
        sponsor : 'Hawaii Department of Budget & Finance',
        url : 'https://www.ehawaii.gov/lilo/app',
        applicationType: 'webkick'
    },
    "IA" : {
//        sponsor: 'State Treasurer of Iowa'
    },
    "ID" : {
//        sponsor: 'Idaho State Treasurer&rsquo;s Office'
    },
    "IL" : {
        sponsor : 'Office of the Illinois State Treasurer',
        url : 'https://icash.illinois.gov/index.asp',
        applicationType: 'webkick'
    },
    "IN" : {
//        sponsor: 'Indiana Attorney General'
    },
    "KS" : {
//        sponsor: 'Office of the Kansas State Treasurer'
    },
    "KY" : {
//        sponsor : 'Kentucky State Treasury'
    },
    "LA" : {
//        sponsor: 'Louisiana Department of Treasury'
    },
    "MA" : {
//        sponsor: 'Massachusetts State Treasury'
    },
    "MD" : {
//        sponsor: 'Comptroller of Maryland'
    },
    "ME" : {
//        sponsor: 'Maine State Treasury'
    },
    "MI" : {
//        sponsor: 'Michigan Department of Treasury'
    },
    "MN" : {
//        sponsor : 'Minnesota Department of Commerce'
    },
    "MO" : {
//        sponsor: 'Missouri State Treasury'
    },
    "MS" : {
//        sponsor : 'Mississippi State Treasurer'
    },
    "MT" : {
//        sponsor : 'Montana Department of Revenue'
    },
    "NC" : {
//        sponsor: 'North Carolina Department of State Treasurer'
    },
    "ND" : {
//        sponsor: 'North Dakota Department of Trust Lands'
    },
    "NE" : {
//        sponsor: 'Nebraska State Treasurer'
    },
    "NH" : {
//        sponsor : 'New Hampshire State Treasury'
    },
    "NJ" : {
//        sponsor : 'New Jersey Department of Treasury'
    },
    "NM" : {
//        sponsor: 'New Mexico Taxation & Revenue Department'
    },
    "NV" : {
//        sponsor: 'Nevada State Treasurer'
    },
    "NY" : {
        sponsor : 'New York Office of the State Comptroller',
        url : 'https://ouf.osc.state.ny.us/',
        applicationType: 'webkick'
    },
    "OH" : {
//        sponsor : 'Ohio Department of Commerce'
    },
    "OK" : {
//        sponsor: 'Oklahoma State Treasurer'
    },
    "OR" : {
        sponsor: 'Oregon Department of State Lands',
        url : 'https://oregonup.us/upweb/up/UP_search.asp',
        applicationType: 'webkick'
    },
    "PA" : {
//        sponsor: 'Pennsylvania Treasury Department'
    },
    "RI" : {
//        sponsor: 'Rhode Island Office of the General Treasurer'
    },
    "SC" : {
        sponsor : 'State Treasurer of South Carolina',
        url : 'https://webprod.cio.sc.gov/SCSTOWeb/mainFrame.do',
        applicationType: 'webkick'
    },
    "SD" : {
//        sponsor: 'South Dakota Office of the State Treasurer'
    },
    "TN" : {
//        sponsor : 'Tennessee Department of Treasury'
    },
    "TX" : {
//        sponsor: 'Texas Comptroller of Public Accounts'
    },
    "UT" : {
//        sponsor: 'Utah State Treasurer'
    },
    "VA" : {
//        sponsor : 'Virginia Department of the Treasury'
    },
    "VT" : {
//        sponsor: 'Vermont State Treasurer'
    },
    "WA" : {
        sponsor: 'Washington State Department of Revenue',
        url: 'http://ucp.dor.wa.gov/',
        applicationType: 'webkick'
    },
    "WI" : {
//        sponsor: 'Wisconsin Department of Revenue'
    },
    "WV" : {
//        sponsor : 'West Virginia State Treasurer'
    },
    "WY" : {
        sponsor : 'Wyoming State Treasurer',
        url : 'http://treasurer.state.wy.us/upsearch.asp',
        applicationType: 'webkick'
    }

};
