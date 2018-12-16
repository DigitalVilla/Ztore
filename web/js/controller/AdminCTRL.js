class AdminCTRL {
    constructor() {
        this.url = "http://localhost:8084/ZtoresAPI/api/";
    }

    adminHandler(animate = true) {
        view.paintAdmin(animate);
        this.printTableHandler(true);
    }

    /**
     * 
     * @param {boolean} true if the list belongs to users, false if it belongs to items;
     */
    printTableHandler(users) {
        let list = users ? 'users' : 'ztore';
        this.closeFields();
        fetcher.API(this.url + list, "GET")
                .then((json) => {
                    view.paintAdminTable(json, users);
                })
    }

    userActionsHandler(user, param, row) {
        switch (param) {
            case "reset":
                fetcher.API(`${this.url}users/${user}/reset`, "PUT");
                this.print(`${user.u_capsWord()}'s password has been reset`);
                break;
            case "change":
                fetcher.API(`${this.url}users/${user}/type`, "PUT")
                        .then(() => {
                            this.printTableHandler(true)
                            this.print(`${user.u_capsWord()}'s type has been changed`);
                        });
                break;
            case "delete":
                view.addClass(row, "slideOutRight", 1000);
                setTimeout(() => {
                    fetcher.API(`${this.url}users/${user}`, "DELETE")
                            .then(() => {
                                this.printTableHandler(true)
                                this.print(`${user.u_capsWord()} has been deleted`);
                            });
                }, 500);

        }

    }

    addNewHandler(table) {
        let key = table.firstElementChild.firstElementChild.children.length;

        if (this.toggle) { // ready to persists
            let fields = view.$(".newItem__input");
            let field1 = fields.children[1].value;
            let field2 = fields.children[2].value;
            let field3 = fields.children[3].value;

            if (field1 == "" || field2 == "" || field3 == "")
                return this.print("All fields are required");
            if (key == 4)
                this.addNewUser(field1, field2, field3, fields);
            else if (key == 5)
                this.addNewItem(field1, field2, field3, fields);
        } else { // create input fields and animation 
            if (key == 4)
                view.addClass(view.addNewUserInput(), "slideInRight", 1000);
            else if (key == 5)
                view.addClass(view.addNewItemInput(), "slideInRight", 1000);

            this.toggle = true; // set the add button as open
        }


    }

    addNewUser(username, password, pass2, fields) {
        fetcher.API(this.url + "users/" + username, "GET")
                .then((user) => {
                    if (fetcher.isEmpty(user)) { //valid username 
                        if (password !== pass2)
                            return this.print("Passwords do not match");
                        // update view
                        this.closeFields();
                        setTimeout(() => {
                            fields.innerHTML = "";
                            fetcher.API(this.url + "users/", "POST", {//persist new user 
                                password,
                                username,
                                type: "user",
                            })
                                    .then(() => {
                                        this.print(`${username.u_capsWord()} has been added`);
                                        this.printTableHandler(true)
                                    });
                        }, 700);
                        this.toggle = false;
                    } else
                        return this.print("Username must be unique");
                });
    }

    addNewItem(description, price, qty, fields) {
        if (!price.u_isNumber())
            return this.print("Price must be a valid number");
        if (!qty.u_isNumber() || !(qty % 1 === 0))
            return this.print("In Stock must be a valid integer");
        //persist new user 
        this.closeFields();
        setTimeout(() => {
            fields.innerHTML = ""; //clear view 
            fetcher.API(this.url + "ztore/", "POST", {//persist new user 
                id: 0,
                description,
                price,
                qty
            })
                    .then(() => {
                        this.print(`Item "${description.u_capsWord()}" has been added`)
                        this.printTableHandler(false);
                    });
        }, 700);
        this.toggle = false;
    }

    deleteItemHandler(id, row) {
        view.addClass(row, "slideOutRight", 1000);
        setTimeout(() => {
            fetcher.API(`${this.url}ztore/${id}`, "DELETE")
                    .then(() => {
                        this.printTableHandler(false)
                        this.print(`Item "${row.firstElementChild.innerText.u_capsWord()}" has been deleted`);
                    });
        }, 500);
    }

    saveItemHandler(id, row) {
        let description = row.children[0].innerText;
        let price = row.children[1].innerText;
        let qty = row.children[2].innerText;

        if (description == "" || price == "" || qty == "")
            return this.print("All fields are required");
        if (!price.u_isNumber())
            return this.print("Price must be a valid number");
        if (!qty.u_isNumber() || !(qty % 1 === 0))
            return this.print("In Stock must be a valid integer");

        //persist new user 
        fetcher.API(this.url + "ztore/" + id, "PUT", {
            id,
            description,
            price,
            qty
        })
                .then(() => this.print(`Item "${row.firstElementChild.innerText.u_capsWord()}" has been updated`));

    }
    print(txt) {
        let msg = view.$("#adminMsg");
        msg.innerText = txt;
        view.removeClass(msg, "hideOP", 2000); 
        view.addClass(msg, "fadeIn", 2000);
    }

    closeFields() {
        let fields = view.$(".newItem__input");
        view.addClass(fields, "slideOutRight", 700);
        setTimeout(() => {
            fields.innerHTML = "";
        }, 700);
        this.toggle = false;
    }
}