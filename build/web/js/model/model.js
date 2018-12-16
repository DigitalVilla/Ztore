class myModel {
    constructor() {
        this.cartDb = "Cart";
        this.ztoreDb = "Ztore";
        this.url = "http://localhost:8084/ZtoresAPI/api/";
    }

    getUser() {
        return sessionStorage.getItem("ZtoreUser");
    }
    setUser(user) {
        sessionStorage.setItem("ZtoreUser", user.u_capsWord());
    }


    getJSON(data) {
        let dbID = (data != "Ztore") ? this.getUser() : "";
        return JSON.parse(sessionStorage.getItem(dbID + data))
    }

    persistLocal(items, data) {
        // the Ztore is global thhe cart is specific of  a user
        let dbID = (data != "Ztore") ? this.getUser() : "";
        sessionStorage.setItem(dbID + data, JSON.stringify(items))
    }

    /**
     * retrieves the element from local storage  
     * @param {*}  
     */
    getItem(id, data) {
        for (const key of this.getJSON(data)) {
            if (key.id == id)
                return key;
        }
    }


    /**
     * pass the entire obj
     * @param {DOM} item 
     */
    updateItem(item, data) {
        let array = this.getJSON(data);

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == item.id)
                array[i] = item;
        }
        this.persistLocal(array, data);
    }
    /**
     * pass the entire obj
     * @param {DOM} item 
     */
    deleteItem(item, data) {
        let array = this.getJSON(data);

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == item.id)
                array.splice(i, 1);
        }
        this.persistLocal(array, data);
    }


    //pass id and in cart
    updateToCart(id, qty) {
        let cart = this.getJSON("Cart");
        let match = !1;

        // if cart has the same item already
        for (const item of cart) {
            if (item.id === id) {
                item.qty += parseInt(qty)
                match = !0;
            }
        }
        // if no match found, append or add to head => .unshift(item);
        if (!match) {
            cart.push({
                id,
                qty,
                username: this.getUser()
            });
        }
        //persist
        this.persistLocal(cart, "Cart");
    }


    setCookie(name, value, days = 100) {
        if (days == 0) //delete cookie
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        function addDays(date, days) {
            let myDate = new Date(date.valueOf());
            myDate.setDate(myDate.getDate() + days);
            return myDate;
        }
        document.cookie = `${name}=${encodeURI(value)}; expires=${addDays(new Date(),days).toUTCString()}`;
    }

    getCookie(name) {
        let docCookies = document.cookie;
        let cIndex = docCookies.indexOf(name + "=");
        if (cIndex == -1) return null;

        cIndex = docCookies.indexOf("=", cIndex) + 1;
        let endStr = docCookies.indexOf(";", cIndex);
        if (endStr == -1) endStr = docCookies.length;

        return decodeURI(docCookies.substring(cIndex, endStr));
    }


    //GLOBAL 

    // send item qty  to db
    persistItem(dbItem) {
        let qty = (dbItem.qty <= 0) ? 0 : dbItem.qty;
        fetcher.API(`${this.url}ztore/${dbItem.id}/qty`, "PUT", qty)
    }

    // send data to db
    /**
     * 
     * @param {int} id of the item to update 
     */
    persistToCart(ItemID) {
        let inCart = this.getItem(ItemID, "Cart"); //get localCart element
        let url = `${this.url}cart/${this.getUser()}/`;
        if (inCart) {
            fetcher.API(url + ItemID, "GET")
                .then((item) => {
                    if (fetcher.isEmpty(item)) { //post a new element
                        fetcher.API(url, "POST", inCart)
                    } else { //update current element
                        fetcher.API(url + ItemID, "PUT", inCart.qty); //update qty
                    }
                });
        } else {
            fetcher.API(url + ItemID, "DELETE");
        }
    }





}