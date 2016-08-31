/**
 * Register all the benefits in the benefits directory
 * So they are accessible through the app
 * @type {Constants|exports|module.exports}
 */

var Registry = require('./registry'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    constants = require('../config/constants');


// Self register all the directories in benefits
var benefitsPath = path.resolve(constants.projectDir, 'benefits');
var files = fs.readdirSync(benefitsPath);
_.each(files, function (file) {
    var stat = fs.statSync(path.resolve(path.resolve(benefitsPath, file)));
    if (stat.isDirectory()) {
        Registry.registerBenefit(file, require(path.resolve(benefitsPath, file, "index")))
    }
});

