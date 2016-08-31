// Project configuration.
module.exports = function (grunt, options) {
    return {
        // This is where we configure JSHint
        // You get to make the name
        // The paths tell JSHint which files to validate
        all : ['**/*.js', '!node_modules/**', '!test/**', '!coverage/**', '!service/screen/**'],
        options : {
            jshintrc : '.jshintrc',
            predef : [ "require", "module", "exports", "console", "__dirname" ]
        }

    }

};