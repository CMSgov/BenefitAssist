
module.exports = {

    mockResponse : {},
    mockError : null,

    reset : function () {
        this.mockError = null;
        this.mockResponse = {};
    },

    search : function (firstname, lastname, city, state, zip, callback) {
        console.log("rewuireResponse is working FIne");
        if (this.mockError) {
                return callback(new Error(this.mockError));
        }
        return callback(null, this.mockResponse);


    }
};