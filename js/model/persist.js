/**
 * This package contains functions for doing client-side storage, including
 * cookies,  localStorage and sessionStorge
 *
 */
class persist {
    /**
     * Sets a cookie.
     *
     * @param inName   The name of the cookie to set.
     * @param inValue  The value of the cookie.
     * @param inExpiry A Date object representing the expiration date of the
     *                 cookie.
     */
    setCookie(inName, inValue, inExpiry) {

        if (typeof inExpiry == "Date") {
            inExpiry = inExpiry.toGMTString();
        }
        document.cookie = inName + "=" + escape(inValue) + "; expires=" + inExpiry;
    }


    /**
     * Gets thbe value of a specified cookie.  Returns null if cookie isn't found.
     *
     * @param inName The name of the cookie to get the value of.
     */
    getCookie(inName) {
        var docCookies = document.cookie;
        var cIndex = docCookies.indexOf(inName + "=");
        if (cIndex == -1) {
            return null;
        }
        cIndex = docCookies.indexOf("=", cIndex) + 1;
        var endStr = docCookies.indexOf(";", cIndex);
        if (endStr == -1) {
            endStr = docCookies.length;
        }
        return unescape(docCookies.substring(cIndex, endStr));
    }

    /**
     * Deletes a cookie.
     */
    deleteCookie(inName) {
        if (this.getCookie(inName)) {
            this.setCookie(inName, null, "Thu, 01-Jan-1970 00:00:01 GMT");
        }

    }


    updateZtore() {

    }

    
    
    /*


    // JSON.parse(str); 
    // JSON.stringify(myObj);



    // Save data to sessionStorage
    sessionStorage.setItem('key', 'value');
    // Get saved data from sessionStorage
    var data = sessionStorage.getItem('key');
    // Remove saved data from sessionStorage
    sessionStorage.removeItem('key');
    // Remove all saved data from sessionStorage
    sessionStorage.clear();


    // Save data to localStorage
    localStorage.setItem('myCat', 'Tom');
    // Get saved data from localStorage
    var cat = localStorage.getItem('myCat');
    // Remove saved data from localStorage
    localStorage.removeItem('myCat');
    // clear all items
    localStorage.clear();

    */





}