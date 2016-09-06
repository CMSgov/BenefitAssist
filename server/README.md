Benefit Assist server
=====================

Benefit Assist is an open source project originally developed by Intuit and donated to the 
Department of Health and Human services. 

The service, built in Node.js, uses a rules based engine to determine the eligibility of an applicant based on a few pieces of input data.
Currently, the service supports determining the eligibility for the following benefits:
* SNAP (food stamps)
 * LIHEAP (discounted or low cost energy)
 * Lifeline (discounted or low cost phone)
 * Medicaid
 * Medicare
 * WIC
 * Veterans pension
 * Veterans health care


You can see a running demo @ http://benefitassist.info



## Getting Started
Confirm you have the necessary components on your computer

* Node.js (v10 or greater) and npm  
    * https://nodejs.org/en/
* Install Grunt client globally  
    * sudo npm install -g grunt-cli 
* Ask the administrator to send you the 'secrets.json' file.  This file contains credentials to thirdparty APIs. (may not be applicable)
    * Copy secrets.json to server/config directory.
* Install the node module dependencies
    * cd server
    * npm install


## Running Code:
* Start the node server. Should start node running on port 3000.
    * cd server
    * node app
* Fire it up with a POST command (content type MUST BE application/json)
    * curl -X POST -H "Content-Type: application/json" -d '{
          "firstName" : "Greg",
          "lastName" : "Miller",
          "state" : "CA",
          "lastMonthTotalIncome" : 500
      }' "http://localhost:3000/benefits/search"


## Running Tests:
* Unit tests are written using Mocha. From the /server directory
    * JS Hint: grunt jshint
    * Unit tests: grunt test
    * Code coverage: grunt coverage
    
    
## SourceTree Setup - optional (visual git interface for the command line impared):
* Sign up for an github account if you don't have one.
* Install SourceTree - https://www.sourcetreeapp.com/
* Sign in and go to File -> New/Clone
* Select New Repository -> clone from url. Enter https://github.com/CMSgov/BenefitAssist.git. Click OK


## Webstorm (or IntelliJ) IDE Setup - optional (Best IDE for debugging Node.js code):
* Install WebStorm. https://www.jetbrains.com/webstorm/
* Open a Project. File -> Open -> /path/to/project on your computer
* Go to Run -> Edit Configurations
* Click on plus sign to add new configuration. Select Node.js
* Give any name (like 'Node Server') in ‘Name’ tab
* Select working directory : /path/to/server directory
* Select JavaScript file : app.js
* Accept other default values and click OK.
* Start the debugger.  Run -> Debug -> <'Node Server' or whatever name you gave the configuration>

