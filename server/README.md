Benefit Assist server
=====================

Benefit Assist Application server utilizes the Node.js technology. Here's how and what all is needed to run Node server locally.

## Getting Started

* Confirm you have the necessary command line utilities
  * `which git && which node && which npm` - should output the location of each
  * if you don't have, go install them globally



## Running Code:
* Pull the latest code from https://github.com/BenefitAssist/
* Ask the administrator to send you the 'secrets.json' file.  This file contains credentials to thirdparty APIs
* Copy that file to server/config directory.
* Run npm install in server directory.
* Run app.js

## SourceTree Setup:
* Install SourceTree
* Sign up for an github account
* Sign in and go to File -> New/Clone
* Select New Repository -> clone from url. Enter Url. Click OK

## Webstorm Setup:
* Install WebStorm and Open the Project (E.g. BenefitAssist/server)
* Go to Run / Debug configuration
* Click on plus sign to add new configuration. Select Node.js
* Give any name in ‘Name’ tab
* Select working directory : /server directory
* Select JavaScript file : app.js
* Accept other default values and click OK.

