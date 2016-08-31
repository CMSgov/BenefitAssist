module.exports = {
    all : {
        options: {
            reporter: 'spec'
        },
        src: ['test/**/*test.js']
    },
    unit : {
        src : ['test/unit/**/*test.js']

    },
    integration : {
        src : ['test/integration/**/*test.js']
    },
    ci : {
        options : {
            reporter: 'xunit',
            captureFile: 'coverage/test/test-results.xml'
        },
        src : ['test/unit/**/*test.js']
    }
};