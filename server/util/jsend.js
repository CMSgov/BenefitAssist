var JSend = {
    /**
     * Send a formatted jsend success response.
     *
     * @param {restify response Object} resp
     * @param {Object} data
     * @api public
     */
    success : function (resp, data) {
        resp.contentType = 'application/json';
        resp.send({status : 'success', data : data});
    },

    /**
     * Send a formatted jsend error response.
     *
     * @param {restify response Object} resp
     * @param {String|Error} errorCode
     * @param {String} message
     * @api public
     */
    error : function (resp, errorCode, message) {
        if (errorCode instanceof Error) {// allow us to pass in Error objects to simplify code elsewhere
            message = errorCode.message;
            errorCode = errorCode.name;
        }
        resp.contentType = 'application/json';
        resp.send({status : 'error', code : errorCode, message : message});
    }
};

module.exports = JSend;
