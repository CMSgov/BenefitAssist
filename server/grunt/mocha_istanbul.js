module.exports = function (grunt, options) {

    grunt.event.on('coverage', function (lcovFileContents, done) {
        done();
    });

    return {
        coverage : {
            src : 'test/unit', // a folder works nicely
            options : {
                coverageFolder : 'coverage/code',
                coverage : true,
                noColors : false,
                //formats the terminal output
                print : 'detail',
                //Minimum coverage threshold
                check : {
                    lines : 1
                },
                excludes : ['test/excluded*.js', 'node_modules/**', 'config/**', 'model/schemas/*.js', 'util/Kaiseki.js',
                    'benefits/*/definition.js', 'coverage/**', 'grunt/**', 'resources/**',
                    'Gruntfile.js', 'gulpfile.js', 'cli*.js'
                ],
                mochaOptions : ['--bail', '--recursive'],
                istanbulOptions : ['--default-excludes', '--include-all-sources'],
                reporter : 'spec',
                reportFormats : ['cobertura', 'lcov']
            }
        }
    }
};


