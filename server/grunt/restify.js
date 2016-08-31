module.exports = function (grunt, options) {

    //set the a127 root. Note this works locally. todo - test on remote server
    process.env.A127_APPROOT = process.env.PWD;

    return {
        options : {
            script: 'app.js',
            port : 3000
        },
        dev: {
            options: {
                background: false
            }
        },
        test: {
            options: {
                background: true,
                args: [process.env.TESTING = true, process.env="test" ],
                //Consider the server to be "running" after an explicit delay (in milliseconds)
                delay: 5000
            }
        },
        testDebug : {
            options: {
                background: true,
                args: [process.env.TESTING = true ],
                //Consider the server to be "running" after an explicit delay (in milliseconds)
                delay: 5000,
                debug : true
            }
        }
}}
