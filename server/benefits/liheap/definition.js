var merge = require('../../util/objectMerge');
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

/**
 *  Liheap information can be found @  http://www.liheapch.acf.hhs.gov/snapshots.htm"
 */


var Defs = {
    "*" : {
        name : 'Low Cost Heating and Cooling',
        desc : 'LIHEAP provides help in paying for your home heating and cooling bill.',
        qualifyText : 'You may qualify for a discount on your monthly gas and electric bill.',
        sponsor : 'U.S. Department of Health & Human Services',
        savingsLabel : 'Discounted',
        savingsNote : 'energy bills',
        unknownAmount : false,
        nextSteps : 'Complete your online application.',
        actionLabel : 'Apply online',
        url : 'http://www.acf.hhs.gov/programs/ocs/liheap-state-and-territory-contact-listing',
        applicationType : 'webkick'
    },
    "AK" : {
        url : 'http://dhss.alaska.gov/dpa/Pages/hap/default.aspx'
    },
    "AL" : {
        url : 'http://www.adeca.alabama.gov/Divisions/energy/Pages/EnergyAssistance.aspx'
    },
    "AR" : {
        url : 'http://humanservices.arkansas.gov/dco/Pages/SupportServices.aspx'
    },
    "AZ" : {
        url : 'https://des.az.gov/services/aging-and-adult/community-services/energy-assistance'
    },
    "CA" : {
        name : 'Low Cost Gas and Electric (CARE)',
        desc : 'The CARE program provides a monthly discount on energy bills to eligible households.',
        nextSteps : 'Apply online or call (depending on your utility company).',
        actionLabel : 'Find utility company',
        savingsLabel : '20%',
        savingsNote : 'monthly discount',
        url : 'http://www.cpuc.ca.gov/General.aspx?id=976'
    },
    "CO" : {
        url : 'https://sites.google.com/a/state.co.us/cdhs-leap/'
    },
    "CT" : {
        url : 'http://www.ct.gov/dss/cwp/view.asp?a=2353&Q=420880&PM=1'
    },
    "DC" : {
        url : 'http://doee.dc.gov/liheap'
    },
    "DE" : {
        url : 'http://dhss.delaware.gov/dhss/dssc/liheap.html'
    },
    "FL" : {
        "nextSteps" : 'Contact and inform your utility company you want to apply for LIHEAP.',
        "actionLabel" : 'Find utility company',
        "url" : "http://www.FloridaJobs.org/LIHEAPHelp"
    },
    "GA" : {
        url : 'http://dfcs.dhs.georgia.gov/energy-assistance'
    },
    "HI" : {
        url : 'http://humanservices.hawaii.gov/bessd/liheap/'
    },
    "IA" : {
        url : 'http://www.dcaa.iowa.gov/bureau_weath/how_apply.html'
    },
    "ID" : {
        url : 'http://www.idahocommunityaction.org/programs/programsenergyassistance/'
    },
    "IL" : {
        nextSteps : 'Contact and inform your utility company you want to apply for LIHEAP.',
        actionLabel : 'Find utility company',
        url : 'http://www.illinois.gov/dceo/CommunityServices/HomeWeatherization/CommunityActionAgencies/Pages/default.aspx'
    },
    "IN" : {
        url : 'http://www.in.gov/ihcda/2329.htm'
    },
    "KS" : {
        nextSteps : 'Complete your online application.',
        actionLabel : 'Apply online',
        url : 'https://oapub1.dcf.ks.gov/OAWeb/staticPages/OA_LIEAP_intro.jsp'
    },
    "KY" : {
        nextSteps : 'Contact and inform your utility company you want to apply for LIHEAP.',
        actionLabel : 'Find utility company',
        url : 'http://chfs.ky.gov/dcbs/dfs/LIHEAP.htm'
    },
    "LA" : {
        nextSteps : 'Contact and inform your utility company you want to apply for LIHEAP.',
        actionLabel : 'Find utility company',
        url : 'http://www.lhc.la.gov/page/energy-assistance'
    },
    "MA" : {
        url : 'http://www.mass.gov/hed/community/energy/low-income-home-energy-assistance-liheap.html'
    },
    "MD" : {
        nextSteps : 'Print and complete the application.',
        actionLabel : 'Print application',
        url : 'http://www.dhr.state.md.us/blog/?page_id=4410'
    },
    "ME" : {
        url : 'http://www.mainehousing.org/programs-services/energy/energydetails/LIHEAP'
    },
    "MI" : {
        nextSteps : 'Contact your local Department of Human Services (DHS) office and ask for assistance in paying for your home heating bills.',
        actionLabel : 'Find your DHS',
        url : 'http://michigan.gov/mdhhs/0,5885,7-339-71547_5531-15420--,00.html'
    },
    "MN" : {
        url : 'http://www.minnesotaenergyresources.com/home/lieap.aspx'
    },
    "MO" : {
        url : 'http://www.dss.mo.gov/fsd/liheap.htm'
    },
    "MS" : {
        url : 'http://www.mdhs.state.ms.us/low-income-home-energy-assistance-program/'
    },
    "MT" : {
        nextSteps : 'Print and complete the application.',
        actionLabel : 'Print application',
        url : 'http://dphhs.mt.gov/hcsd/energyassistance.aspx'
    },
    "NC" : {
        url : 'http://www.ncdhhs.gov/dss/energy/apply.htm'
    },
    "ND" : {
        url : 'http://www.nd.gov/dhs/services/financialhelp/energyassist.html'
    },
    "NE" : {
        url : 'http://dhhs.ne.gov/children_family_services/Pages/fia_energy.aspx'
    },
    "NH" : {
        url : 'http://www.nh.gov/oep/energy/programs/fuel-assistance/index.htm'
    },
    "NJ" : {
        url : 'http://www.nj.gov/dca/divisions/dhcr/offices/hea.html'
    },
    "NM" : {
        url : 'http://www.hsd.state.nm.us/LookingForAssistance/Field_Offices_1.aspx'
    },
    "NV" : {
        url : 'https://dwss.nv.gov/'
    },
    "NY" : {
        url : 'http://otda.ny.gov/programs/heap/'
    },
    "OH" : {
        url : 'http://development.ohio.gov/is/is_heap.htm'
    },
    "OK" : {
        url : 'http://www.okdhs.org/services/liheap/Pages/UtilityServicesLIHEAPMain.aspx'
    },
    "OR" : {
        url : 'http://www.oregon.gov/ohcs/Pages/energy-weatherization-programs-oregon.aspx'
    },
    "PA" : {
        url : 'http://www.dhs.pa.gov/citizens/heatingassistanceliheap/index.htm#.Vpkm1ZMrJBw'
    },
    "RI" : {
        url : 'http://www.energy.ri.gov/lowincome/liheap.php'
    },
    "SC" : {
        url : 'http://oeo.sc.gov/liheap.html'
    },
    "SD" : {
        url : 'https://dss.sd.gov/economicassistance/energyassistance/'
    },
    "TN" : {
        url : 'http://thda.org/index.aspx?NID=591'
    },
    "TX" : {
        url : 'http://www.tdhca.state.tx.us/community-affairs/ceap/index.htm'
    },
    "UT" : {
        url : 'http://jobs.utah.gov/housing/seal/heat.html'
    },
    "VA" : {
        url : 'http://www.dss.virginia.gov/benefit/ea/index.cgi'
    },
    "VT" : {
        url : 'http://dcf.vermont.gov/benefits/fuel-assistance'
    },
    "WA" : {
        url : 'http://www.commerce.wa.gov/Services/individualassistance/Low-Income-Home-Energy-Assistance-Program/Pages/default.aspx'
    },
    "WI" : {
        url : 'http://homeenergyplus.wi.gov/section.asp?linkid=119&locid=25'
    },
    "WV" : {
        url : 'http://www.dhhr.wv.gov/bcf/Pages/MapList.aspx'
    },
    "WY" : {
        url : 'http://dfsweb.wyo.gov/economic-assistance/lieap'
    }
};
