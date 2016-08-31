/**
 * Created by gmiller on 4/18/14.
 */

module.exports = function (grunt) {
    // This line makes your node configurations available for use
//    pkg : grunt.file.readJSON('package.json'),


    var options = {
        config : {
            src : "grunt/*.js"
        }
    };

    //loads the various task configuration files found in the grunt directory
    var configs = require('load-grunt-configs')(grunt, options);

    grunt.initConfig(configs);

    // Each plugin must be loaded following this pattern
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-plato');


    /*
     * Generates code coverage placing the results in the coverage directory
     */
    grunt.registerTask('coverage', ['clean:coverage', 'mocha_istanbul:coverage']);

    /*
     * Handles build related tasks
     */
    grunt.registerTask('js-hint', ['jshint']);
    grunt.registerTask('release', ['jshint', 'coverage']);

    /*
     * Runs the tests
     */
    grunt.registerTask('test', function (target, option) {
        //need to handle debug options a little different depending on the test type since grunt mocahTest doesn't support runtime debug options
        var testType;
        switch (target) {
            case 'unit' :
                testType = (option === 'debug') ? 'exec:debugUnit' : 'mochaTest:unit';
                grunt.task.run([testType, 'mochaTest']);
                break;
            case 'integration' :
                testType = (option === 'debug') ? 'express:testDebug' : 'express:test';
                grunt.task.run(['mochaTest', testType, 'mochaTest:integration']);
                break;
            case 'ci' :
                //ci runs the build step so not needed here
                grunt.task.run(['clean:test', 'mochaTest:ci']);
                break;
            default :
                grunt.task.run(['mochaTest', 'mochaTest:integration', 'mochaTest:unit']);
                break;
        }
    });


    /*
     * Starts the node server
     */
    //    grunt.registerTask('server', ['build','express:dev']);


};//end export

