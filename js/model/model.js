class myModel {
    constructor() {
    }

    getUser() {
        return "villa";
    }

    getJSON(data){
        return JSON.parse(sessionStorage.getItem(this.getUser() +data))
    }

    persistLocal(items,data) {
        sessionStorage.setItem(this.getUser() + data, JSON.stringify(items))
    }

    /**
     * retrieves the element from local storage  
     * @param {*}  
     */
    getItem(id) {
        for (const key of this.getJSON("Ztore")) {
            if (key.id == id)
                return key;
        }
    }

    /**
     * 
     * @param {DOM} item 
     */
    updateLocalZtore(item) {
        let ztore = this.getJSON("Ztore");

        for (const z of ztore) {
            if (z.id == item.id) {
                z.inStock = item.inStock;
            }
        }
        //persist
        this.persistLocal(ztore,"Ztore");
    }

    updateLocalCart(id, inCart) {
        let cart = this.getJSON("Cart");
        let match = !1;

        // if cart has the same item already
        for (const item of cart) {
            if (item.id === id) {
                item.inCart += inCart
                match = !0;
            }
        }
        // if no match found, append or add to head => .unshift(item);
        if (!match) {
            cart.push({
                id,
                inCart,
                user: this.getUser()
            });
        }
        //persist
        this.persistLocal(cart,"Cart");
    }

    /**
     * This method returns a valid number within the range [1 to limit] 
     * If the value cannot be parsed into int. it returns a [-1 ]
     * @param {string} value the number to evaluate
     * @param {string} limit the max number it can grow  
     */
    validateQty(value, limit) {
        if (!isNaN(+value) && isFinite(value)) {
            limit = parseInt(limit);
            let val = parseInt(value);
            return (val > limit) ? limit : (val < 1) ? 1 : val;
        }
        return -1;
    }


}