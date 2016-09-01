var Constants = require('../../config/constants');
var merge = require('../../util/objectMerge');
var StringUtil = require('../../util/stringutil');


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
        name : 'SNAP (Food Stamps)',
        desc : 'SNAP assists low-income households in purchasing the food they need to maintain adequate nutritional levels.',
        savingsLabel : function (model, searchResults) {
            var desc = '<%lowamount%> - <%amount%>*';
            // Format the description with amount and period

            desc = desc.replace('<%amount%>', '$' + StringUtil.toThousandCommas(searchResults.amount));

            desc = desc.replace('<%lowamount%>', '$' + StringUtil.toThousandCommas(searchResults.lowAmount));
            return desc;

        },
        savingsNote : 'per month',
        sponsor : 'USDA - United States Department of Agriculture',
        disclaimer : '*Estimate subject to state approval',
        nextSteps : 'Complete your online application.',
        actionLabel : "Apply online",
        unknownAmount : false,
        url : 'http://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program-snap',
        applicationType : "webkick"
    },
    "AK" : {
        sponsor : 'Alaska Department of Health and Social Services',
        nextSteps : 'Apply through a local public assistance office',
        actionLabel : 'Find your office',
        url : 'http://dhss.alaska.gov/dpa/Pages/features/org/application-gen50b.aspx'
    },
    "AR" : {
        sponsor : 'Arkansas Department of Human Services',
        url : 'https://access.arkansas.gov/Welcome.aspx',
        savingsLabel : "Savings",
        savingsNote : 'on groceries'
    },
    "AZ" : {
        sponsor : 'Arizona Department of Economic Security',
        url : 'https://www.healthearizonaplus.gov/'
    },
    "CA" : {
        name : 'CalFresh (Food Stamps)',
        desc : 'CalFresh assists low-income households in purchasing the food they need to maintain adequate nutritional levels.',
        sponsor : 'California Department of Social Services',
        url :  "http://www.benefitscal.org/"
    },
    "CO" : {
        sponsor : 'Colorado Department of Human Services',
        url : 'http://coloradopeak.force.com/'
    },
    "CT" : {
        sponsor : 'Connecticut Department of Social Services',
        url : 'https://connect.ct.gov/'
    },
    "DC" : {
        sponsor : 'D.C. Department of Human Services',
        url : 'http://dhs.dc.gov/node/117542'
    },
    "DE" : {
        sponsor : 'Delaware Health and Social Services',
        url : 'https://assist.dhss.delaware.gov/'
    },
    "FL" : {
        sponsor : 'Florida Department of Children and Families',
        url : "https://dcf-access.dcf.state.fl.us/access/scrflhomepage.do"
    },
    "GA" : {
        sponsor : 'Georgia Department of Human Services',
        url : 'https://compass.ga.gov/selfservice/'
    },
    "HI" : {
        sponsor : 'Hawaii Department of Human Services',
        url : 'http://humanservices.hawaii.gov/'
    },
    "IA" : {
        sponsor : 'Iowa Department of Human Services',
        url : 'https://secureapp.dhs.state.ia.us/oasis/'
    },
    "ID" : {
        sponsor : 'Idaho Department of Health and Welfare',
        url : 'http://www.healthandwelfare.idaho.gov/FoodCashAssistance/ApplyforAssistance/tabid/1554/Default.aspx'
    },
    "IL" : {
        sponsor : 'Illinois Department of Human Services',
        url : 'https://abe.illinois.gov/abe/access'
    },
    "IN" : {
        sponsor : 'Indiana Family and Social Services Administration',
        url : 'https://www.ifcem.com/CitizenPortal/application.do?programBenefitPageInd=true'
    },
    "KS" : {
        sponsor : 'Kansas Department for Children and Families',
        url : 'http://www.dcf.ks.gov/services/ees/Pages/Application-for-benefits.aspx'
    },
    "KY" : {
        sponsor : 'Kentucky Cabinet for Health and Family Services',
        url : 'https://prd.chfs.ky.gov/SNAPPrescreen/SNAPLanding.aspx'
    },
    "LA" : {
        sponsor : 'Louisiana Department of Children & Family Services',
        url : 'https://cafe-cp.dcfs.la.gov/selfservice/'
    },
    "MA" : {
        sponsor : 'Massachusetts Health and Human Services',
        url : 'https://service.hhs.state.ma.us/ierhome/ChooseService.do?method=displayChooseServicePage'
    },
    "MD" : {
        sponsor : 'Maryland Department of Human Resources',
        url : 'https://mydhrbenefits.dhr.state.md.us/dashboardclient/'
    },
    "ME" : {
        sponsor : 'Maine Department of Health and Human Services',
        url : 'http://www.maine.gov/dhhs/ofi/services/snap/index.html'
    },
    "MI" : {
        sponsor : 'Michigan Department of Human Services',
        url : 'https://www.mibridges.michigan.gov/access/'
    },
    "MN" : {
        sponsor : 'Minnesota Department of Human Services',
        url : 'https://applymn.dhs.mn.gov/online-app-web/spring/public/process-login'
    },
    "MO" : {
        sponsor : 'Missouri Department of Social Services',
        url : 'http://dss.mo.gov/fsd/fstamp/'
    },
    "MS" : {
        sponsor : 'Mississippi Department of Human Services',
        url : 'http://www.mdhs.state.ms.us/field-operations/programs-dfo/supplemental-nutrition-assistance-program-(snap)/snap-for-the-client/how-do-i-apply/'
    },
    "MT" : {
        sponsor : 'Montana Department of Public Health and Human Services',
        url : 'https://apply.mt.gov/'
    },
    "NC" : {
        sponsor : 'North Carolina Department of Health and Human Services',
        url : 'https://www.epass.nc.gov/CitizenPortal/application.do'
    },
    "ND" : {
        sponsor : 'North Dakota Department of Human Services',
        url : 'https://www.nd.gov/dhs/info/pubs/application.html'
    },
    "NE" : {
        sponsor : 'Nebraska Department of Health & Human Services',
        url : 'http://dhhs.ne.gov/Children_Family_Services/AccessNebraska'
    },
    "NH" : {
        sponsor : 'New Hampshire Department of Health and Human Services',
        url : 'https://nheasy.nh.gov/login'
    },
    "NJ" : {
        sponsor : 'New Jersey Department of Human Services',
        url : 'https://oneapp.dhs.state.nj.us/Forms/SignIn/frmStart.aspx'
    },
    "NM" : {
        sponsor : 'New Mexico Human Services Department',
        url : 'https://www.yes.state.nm.us/'
    },
    "NV" : {
        sponsor : 'Nevada Department of Health and Human Services',
        url : 'https://dwss.nv.gov/'
    },
    "NY" : {
        sponsor : 'New York Office of Temporary and Disability Assistance',
        url : 'https://mybenefits.ny.gov'
    },
    "OH" : {
        sponsor : 'Ohio Department of Job and Family Services',
        url : 'https://odjfsbenefits.ohio.gov/SelfServiceSplash.jsf'
    },
    "OK" : {
        sponsor : 'Oklahoma Department of Human Services',
        url : 'https://www.okdhslive.org'
    },
    "OR" : {
        sponsor : 'Oregon Department of Human Services',
        url : 'https://apps.state.or.us/onlineApplication/'
    },
    "PA" : {
        sponsor : 'Pennsylvania Department of Public Welfare',
        url : 'https://www.compass.state.pa.us'
    },
    "RI" : {
        sponsor : 'Rhode Island Department of Human Services',
        url : 'https://healthyrhode.ri.gov/HIXWebI3/DisplayRIServices'
    },
    "SC" : {
        sponsor : 'South Carolina Department of Social Services',
        url : 'https://scmapp.sc.gov/'
    },
    "SD" : {
        sponsor : 'South Dakota Department of Social Services',
        url : 'http://dss.sd.gov/economicassistance/snap/'
    },
    "TN" : {
        sponsor : 'Tennessee Department of Human Services',
        url : 'http://www.tennessee.gov/humanservices/article/supplemental-nutrition-assistance-program-snap',
        savingsLabel : "Savings",
        savingsNote : 'on groceries'
    },
    "TX" : {
        sponsor : 'Texas Health and Human Services Commission',
        url : 'https://www.yourtexasbenefits.com/ssp/SSPHome/ssphome.jsp'
    },
    "UT" : {
        sponsor : 'Utah Department of Workforce Services',
        url : 'https://jobs.utah.gov/assistance/index.html'
    },
    "VA" : {
        sponsor : 'Virginia Department of Social Services',
        url : 'https://commonhelp.virginia.gov/'
    },
    "VT" : {
        sponsor : 'Vermont Department for Children and Families',
        url : 'http://dcf.vermont.gov/mybenefits'
    },
    "WA" : {
        sponsor : 'Washington State Department of Social and Health Services',
        url : 'https://www.washingtonconnection.org/'
    },
    "WI" : {
        sponsor : 'Wisconsin Department of Health Services',
        url : 'https://access.wisconsin.gov/'
    },
    "WV" : {
        sponsor : 'West Virginia Department of Health and Human Resources',
        url : 'https://www.wvinroads.org/selfservice/'
    },
    "WY" : {
        sponsor : 'Wyoming Department of Family Services',
        url : 'https://docs.google.com/a/wyo.gov/viewer?a=v&pid=sites&srcid=d3lvLmdvdnxkZnN3ZWJ8Z3g6NmNjNzIyZWJjODc1ZDk4Zg'
    }

};