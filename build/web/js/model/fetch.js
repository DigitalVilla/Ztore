/**
 * This class has the utility methods to retrieve data from Ajax call and dom 
 */
'use strict';

class myFetch {
    constructor() {}

    //AJAX METHODS
    /**
     * 
     * @param {String} url 
     * @param {String} http method 
     * @param {JSON} Msg to send 
     */
    API(url, method, JsonMsg = null) {
        method = method.toUpperCase();
        const params = {
            method,
            headers: {
                'Content-type': "application/json; charset=utf-8"
            }
        };

        if (method != 'GET')
            params.body = (JsonMsg) ? JSON.stringify(JsonMsg) : "empty";

        return new Promise((resolve, reject) => {
            fetch(url, params)
                .then((response) => this.handleError(response))
                .then(json => resolve(json))
                .catch(err => reject(err));
        });
    }

    handleError(response) {
        if (!response.ok) {
            throw Error(`Fetecher encountered a ${response.status} error.`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1)
            return response.json();
        else
            return response.text();

    }

    isEmpty(obj) {
        if (obj == "" || obj == null || obj == {} || obj == [])
            return true;
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}


///Utility PROTOTYPES

String.prototype.u_capsWord = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

String.prototype.u_isNumber = function () {
    if (typeof this != "string") return false
    return !isNaN(this) && !isNaN(parseFloat(this))
}

