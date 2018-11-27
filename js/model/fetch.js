/**
 * This class has the utility methods to retrieve data from Ajax call and dom 
 */
'use strict';

class myFetch {
    constructor() {}

    //AJAX METHODS
    API(url, method, JsonMsg = null) {
        method = method.toUpperCase();
        const params = {
            method,
            headers: {
                'Content-type': "application/json; charset=utf-8"
            }
        };

        if (method == 'PUT' || method == 'POST')
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
        return response.json();
    }
   
}




 //UTILS
 function  random(min, max) {
    return (max > min) ?
        ~~(min + (max + 1 - min) * Math.random()) : 0;
}

function setCookie(name, value, days = 100) {
    if (days == 0) //delete cookie
        return document.cookie = `${name}=${null}; expires=Thu, 01-Jan-1970 00:00:01 UTC;path=/`;

    function addDays(date, days) {
        var myDate = new Date(date.valueOf());
        myDate.setDate(myDate.getDate() + days);
        return myDate;
    }
    document.cookie = `${name}=${encodeURI(value)}; expires=${addDays(new Date(),days).toUTCString()}`;
}

function getCookie(name) {
    var docCookies = document.cookie;
    var cIndex = docCookies.indexOf(name + "=");
    if (cIndex == -1) return null;

    cIndex = docCookies.indexOf("=", cIndex) + 1;
    var endStr = docCookies.indexOf(";", cIndex);
    if (endStr == -1) endStr = docCookies.length;

    return decodeURI(docCookies.substring(cIndex, endStr));
}




//Easy PROTOTYPES
// Fisher--Yates Algorithm
Array.prototype.u_shuffle = function () {
    var m = this.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = this[m];
        this[m] = this[i];
        this[i] = t;
    }
    return this;
}


/**
 * This function Capitalizes every word in a sentence.
 * @param delimeter to split the sentence and capitalize only the staring character in each split. i.e '.' in paragraphs or ',' in a list. 
 */
String.prototype.u_capsAll = function (delimeter = " ") {
    var str = this.split(delimeter);
    str.forEach((el, indx) => {
        let c = "",
            i = 0;
        for (i; i < el.length; i++) {
            c = el.charAt(i);
            if (c.toLowerCase() != c.toUpperCase())
                break;
        }

        str[indx] = el.slice(0, i) + c.toUpperCase() +
            el.slice(i + 1).toLowerCase();
    });
    return str.join(delimeter);
}

String.prototype.u_insert = function (values) {
    if (values && values.length < 1 || this.length < 2 || this.indexOf("*?") < 0)
        return this;
    let str = this;
    values.forEach((val) => {
        let indx = str.indexOf("*?");
        if (indx >= 0)
            str = str.substring(0, indx) + val + str.substring(indx + 2);
    })
    return str;
}

String.prototype.u_capsWord = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}



function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
  
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };
  

  function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };
