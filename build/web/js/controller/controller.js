class controller {

    constructor() {
        this.z = new ZtoreCTRL();
        this.a = new AdminCTRL();
        this.url = "http://localhost:8084/ZtoresAPI/api/";
    }

    init() {
        view.displayStatic(); // no scroll
        let user = model.getUser();
        if (user == null) { // no cookie in the system
            view.paintLogin("Login")
        } else {
            fetcher.API(`${this.url}users/${user}/type`, "GET")
                .then((type) => {
                    view.displayUser(type);
                    if (type != "admin") {
                        view.displayStatic(false); //allow scroll
                        this.z.loadDatabase();
                        this.z.loadUserCart();

                    } else if (type == "admin") {
                        view.displayStatic();
                        this.adminHandler();
                    }
                })
        }
    }

    itemHandler(item, add) {
        this.z.itemHandler(item, add);
    }

    cartItemHandler(item, add) {
        this.z.cartItemHandler(item, add);
    }

    cartDeleteHandler(item) {
        this.z.cartDeleteHandler(item);
    }

    cartBtnHandler(item) {
        this.z.cartBtnHandler(item);
    }

    loginHandler(e) {
        new LoginCTRL(e).loginHandler();
    }

    logOutHandler() {
        sessionStorage.clear();
        window.location.href = "SessionControl?logout=true";
    }

    formHandler(form) {
        view.paintLogin(form, false);
    }

    checkoutHandler() {
        if (model.getJSON("Cart").length == 0) //delete global
            return view.removeClass(view.$(".orderMsg"), "hideOP", 1E3)
        fetcher.API(`${this.url}cart/${model.getUser()}/all`, "DELETE").then(() => {
            invoice.style.display = "block";
            view.displayStatic();
            view.paintInvoice();
            model.persistLocal([], "Cart"); //delete local
        })
    }

    sendInvoiceHandler() {
        window.location.href = "SessionControl?sendInvoice=true";
        invoice.style.display = "none";
        invoice.innerHTML = "";
        view.$(".loginBG").remove();
    }

    adminHandler(animate = true) {
        view.paintAdmin(animate);
        this.a.printTableHandler(true);
    }

    /**
     * 
     * @param {boolean} true if the list belongs to users, false if it belongs to items;
     */
    printTableHandler(users) {
        this.a.printTableHandler(users);
    }

    userActionsHandler(user, param, row) {
        this.a.userActionsHandler(user, param, row);

    }

    addNewHandler(table) {
        this.a.addNewHandler(table);
    }

    deleteItemHandler(id, row) {
        this.a.deleteItemHandler(id, row);
    }

    saveItemHandler(id, row) {
        this.a.saveItemHandler(id, row);
    }
    closeFields() {
        this.a.closeFields();
    }
}