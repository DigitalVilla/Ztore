class myView {

    constructor() {
        this.cartBtn = this.$("#cart_btn");
        this.sideNav = this.$("#sidebar");
        this.c = new myViews();
    }

    //DOM METHODS
    displayStatic(content = true) {
        const app = view.$(".container");
        app.style.height = content && "100vh" || "auto";
        app.style.overflow = content && "hidden" || "auto";
    }

    $(query) {
        let select = document.querySelectorAll(query)
        return (select.length === 1) ? select[0] : select;
    }

    displayUser(type) {
        this.$("#username-" + type).innerText = `Welcome ${model.getUser()}!`
    }


    updateCartBtn() {
        const len = model.getJSON("Cart").length;
        const cartBadge = this.cartBtn.lastElementChild.lastElementChild;
        if (len > 0) {
            this.addClass(cartBadge, "toCart", 700);
            cartBadge.style.opacity = 1;
            cartBadge.innerText = len;
        } else {
            cartBadge.style.opacity = 0;
        }
    }

    updateQtyInput(input, qty) {
        input.value = qty;
    }

    updatePriceLabel(element, price) {
        let tag = element.nextSibling.lastElementChild;
        tag.innerText = this.formatMoney(price);
    }

    updateStockBadge(element, inStock) {
        let badge = element.parentNode.firstElementChild.firstElementChild;
        badge.innerText = inStock;
    }

    /**
     * @param {*} element to add  the new class
     * @param {*} className to add
     * @param {*} timer to remove class  optional.
     */
    addClass(element, className, timer = 500) {
        element.classList.add(className);
        console.log(element)
        if (className == "fadeIn")
            element.style.opacity = "1 !imoprtant;"
        if (timer != 0) {
            setTimeout(() => {
                element.classList.remove(className);
                 if (className == "fadeIn")
                element.style.opacity = "0 !imoprtant;"
            }, timer);
        }
    }
    /**
     * @param {*} element to add  the new class
     * @param {*} className to add
     * @param {*} timer to remove class  optional.
     */
    removeClass(element, className, timer = 500) {
        element.classList.remove(className);
        if (timer != 0) {
            setTimeout(() => {
                element.classList.add(className);
            }, timer);
        }
    }


    /**
     * @param {*} element to add  the new class
     * @param {*} className to add
     * @param {*} timer to remove class  optional.
     */
    toggleOn(list, element, className = "active") {
        for (const el of list) {
            el.classList.remove(className);
        }
        element.classList.add(className);
    }

    /**
     * @param {Node} parent to attach new node optional
     * @param {String} tag type of html element to create
     * @param {Object} attributes to be added to the node
     * @param {Object} content optional attributes 
     */
    newElement(parent, tag, attributes, content) {
        let el = document.createElement(tag);
        if (attributes)
            for (let a in attributes) {
                el.setAttribute(a, attributes[a]);
            }
        if (content)
            for (let c in content) {
                el[c] = content[c];
            }
        if (parent) {
            parent.appendChild(el);
            return parent.lastElementChild;
        }
        return el;
    }

    clearLogin() {
        let log = this.$("#login");
        let bg = this.$(".loginBG");

        view.addClass(log, "fadeOut", 1000);
        view.addClass(bg, "fadeOut", 1000);
        setTimeout(() => {
            bg.style.display = "none";
            log.style.display = "none";
        }, 1000);
    }

    updateOrder() {
        let inv = this.getTotal();

        let form = order.lastElementChild;
        let date = form.children[0].lastElementChild;
        date.innerText = this.dateToString();

        let SUBTOTAL = form.children[1].lastElementChild;
        SUBTOTAL.innerText = "$" + this.formatMoney(inv.total);
        let GST = form.children[2].lastElementChild;
        GST.innerText = "$" + this.formatMoney(inv.gst);
        let SHIPPING = form.children[3].lastElementChild;
        SHIPPING.innerText = "$" + this.formatMoney(inv.shipping);
        let DISCOUNT = form.children[4].lastElementChild;
        DISCOUNT.innerText = "$" + this.formatMoney(inv.discount);
        let TOTAL = form.children[5].lastElementChild;
        TOTAL.innerText = "$" + this.formatMoney(inv.total + inv.gst + inv.shipping - inv.discount);
    }


    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
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

    dateToString() {
        let d = new Date() + "";
        return (d.split(" ")).splice(0, 5).join(" ");
    }

    getTotal() {
        let total = 0
        let cart = model.getJSON("Cart");
        if (cart != null && cart.length > 0)
            for (const c of cart) {
                total += model.getItem(c.id, "Ztore").price * c.qty;
            }
        return {
            total,
            gst: total * 0.05,
            shipping: total > 1000 ? 22 : total > 100 ? 4.5 : 0,
            discount: total * 0.1
        };
    }

    paintAdmin(animated = true) {
        const admin = view.$(".adminPanel");
        admin.style.display = "block";
        if (animated)
            this.addClass(admin, "fadeIn", 1000);

    }

    loadItems(arr) {
        this.c.loadItems(arr);
    }

    loadCartItems(arr) {
        this.c.loadCartItems(arr);

    }

    paintLogin(form, animated = true, username = "") {
        this.c.paintLogin(form, animated, username);
    }


    paintAdminTable(elements, users) {
        this.c.paintAdminTable(elements, users);
    }


    addNewUserInput() {
        return this.c.addNewUserInput();
    }

    addNewItemInput() {
        return this.c.addNewItemInput();
    }
    paintInvoice() {
        this.c.paintInvoice();
    }

}