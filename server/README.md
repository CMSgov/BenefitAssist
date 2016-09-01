Benefit Assist server
=====================

Benefit Assist Application server utilizes the Node.js technology. Here's how and what all is needed to run Node server locally.

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

## SourceTree Setup - optional (visual git interface for the command line impared):
* Sign up for an github account if you don't have one.
* Install SourceTree - https://www.sourcetreeapp.com/
* Sign in and go to File -> New/Clone
* Select New Repository -> clone from url. Enter https://github.com/CMSgov/BenefitAssist.git. Click OK


## Webstorm IDE Setup:
* Install WebStorm and Open the Project (E.g. BenefitAssist/server)
* Go to Run / Debug configuration
* Click on plus sign to add new configuration. Select Node.js
* Give any name in ‘Name’ tab
* Select working directory : /path/to/server directory
* Select JavaScript file : app.js
* Accept other default values and click OK.

