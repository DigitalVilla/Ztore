class myViews {
    constructor() {

    }
    loadItems(arr) {
        ztore.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
            let outStock = "";
            if (arr[i].qty == 0) {
                // continue;
                outStock = " outStock";
            }
            const item = view.newElement(ztore, "div", {
                class: "item noselect" + outStock,
                id: arr[i].id,
                "data-id": arr[i].qty
            }) //main div
            const fig = view.newElement(item, "figure", {
                class: "item__img"
            }, {
                innerHTML: `<span class='item__img--inStock'>
            ${arr[i].qty}</span>`
            }) // image holder

            fig.style.backgroundImage = `linear-gradient(rgba(255, 0, 94, 0.1), rgba(212, 0, 179, 0.3)), url("./img/${arr[i].description.replace(/\s/g,'').toLowerCase()}.png")`; //image style

            item.innerHTML += `<h5 class="item__name">${arr[i].description}</h5>
             <p class="item__description">${this.lorem(18)}</p>`; // title and dummy text;     
            view.newElement(item, "div", {
                class: "item__quantity"
            }, {
                innerHTML: `<span onclick="minusQty(this)"><svg >
                <use xlink:href='img/sprites.svg#icon-minus'></use>
            </svg> </span> 
            <input class="${outStock}" type="text" placeholder="1" pattern="\d{1,5}">
            <span onclick="plusQty(this)"><svg>
              <use xlink:href='img/sprites.svg#icon-plus'></use>
            </svg></span>`
            }); //quantity selector 
            view.newElement(item, "div", {
                class: "item__price"
            }, {
                innerHTML: `<svg><use xlink:href='img/sprites.svg#icon-dollar'></use></svg>
            <span class="total">${view.formatMoney(arr[i].price)}</span>`
            }); // price display
            view.newElement(item, "button", {
                class: "btn" + outStock,
                type: "submit",
                "data-id": arr[i].id,
                onclick: "toCartBtn(this)"
            }, {
                innerText: (outStock) ? "Out of Stock" : "Add To Cart"
            }); // button to cart
        }
    }

    loadCartItems(arr = model.getJSON("Cart")) {
        cart.innerHTML = "";

        for (let i = 0; i < arr.length; i++) {
            let zItem = model.getItem(arr[i].id, "Ztore");

            // <div class="cart__item" id="card1">
            if (arr[i].qty == 0) {
                continue;
            }
            let item = view.newElement(cart, "div", {
                class: "cart__item",
                "data-id": arr[i].id,
                "data-inCart": arr[i].qty
            })

            const fig = view.newElement(item, "figure", {
                class: "cart__item--fig"
            }, {
                innerHTML: `<div onclick="removeItem(this)" data-id="${zItem.id}"class="span">
            <svg><use xlink:href='img/sprites.svg#icon-close'></use>
            </svg></div>`
            }) // image holder

            fig.style.backgroundImage = `linear-gradient(rgba(255, 0, 94, 0.1), rgba(212, 0, 179, 0.3)), url("./img/${(zItem.description).replace(/\s/g,'').toLowerCase()}.png")`; //image style
            let content = view.newElement(item, "div", {
                class: "cart__item--content"
            }, {
                innerHTML: `<div class="cart__item--details">
                <p>${zItem.description}</p></div>`
            })

            let controls = view.newElement(content, "div", {
                class: "cart__item--controls",
                id: zItem.id,
            });

            view.newElement(controls, "div", {
                class: "item__quantity"
            }, {
                innerHTML: `
                    <span onclick="minusCart(this)">
                        <svg >
                            <use xlink:href='img/sprites.svg#icon-minus'></use>
                        </svg>
                    </span> 
                    
                    <input type="text" value="${arr[i].qty}" pattern="\d{1,5}">
            <span onclick="plusCart(this);"><svg>
              <use xlink:href='img/sprites.svg#icon-plus'></use>
            </svg></span>`
            }); //quantiity selector 
            view.newElement(controls, "div", {
                class: "item__price"
            }, {
                innerHTML: `<svg><use xlink:href='img/sprites.svg#icon-dollar'></use></svg>
            <span class="total">${view.formatMoney(zItem.price*arr[i].qty)}</span>`
            }); // price display
        }
    }

    lorem(words) {
        let lorem = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda porro autem cumque saepe reiciendis? Voluptatum quas at ex minus architecto quaerat veritatis eaque ipsum doloremque corporis repudiandae, animi eum doloribus delectus facilis rerum quod, numquam laudantium repellat sint quo voluptatibus. Culpa necessitatibus minus deleniti voluptatibus excepturi similique officia cupiditate voluptates corporis quam, tempore repudiandae illo at, fugit ipsa facere numquam eligendi quae temporibus. Rerum error repellat nihil. Tenetur possimus dolores, saepe quae non quas ratione? Cupiditate, blanditiis libero obcaecati natus cum dicta a? Minus culpa voluptates dolore. Mollitia, necessitatibus quam, non laborum odio esse ipsa ab tempore a vitae provident!`.split(" ");
        let copy = [];
        for (let i = 0; i < lorem.length; i++) {
            copy[i] = lorem[i];
            if (i == words - 1)
                break;
        }
        return copy.join(" ");

    }



    paintLogin(form, animated = true, username = "") {
        let forms = {
            Login: ["Login", "Register", "Remember me", "hideDis"],
            Register: ["Register", "Login", "Agree with terms of service", "nada"]
        }

        let login = view.$(".login");
        login.style.display = "block";

        let loginBG = view.$(".loginBG");
        //setBF just once
        if (loginBG.length == 0) {
            let bg = view.newElement(null, "span", {
                class: "loginBG"
            });
            view.$(".container").insertBefore(bg, login);
        } else {
            loginBG.style.display = "block";
        }

        login.innerHTML = `${(form == "Login")?"<br><br><br>":"" }
            <div class="login__title">
                <img class="login__logo" src="img/logo.png" alt="logo">
                <span class="heading-2 light">${forms[form][0]}</span>
            </div><br>`;

        view.newElement(login, "form", {
            id: "loginForm",
            method: "POST",
            action: "",
            "data-id": forms[form][0]
        }, {
            innerHTML: `<input class="input" type="text" name="user" value="${username || (form === "Login") && model.getCookie("RMMBRM") || ""}" placeholder="Username" />
            <input class="input" type="password" name="password"  placeholder="Password" />
            <input class="input ${forms[form][3]}" type="password" name="password2" placeholder="Confirm password" >
          
            <button type="submit" class="login__btn btn">${forms[form][0]}</button>
            <label class="login__checkbox">
             <input id="remember" type="checkbox" ${(model.getCookie("RMMBRM") && form === "Login") ?"checked" : ""}         />
                <span class="login__btn--checkbox span"></span>${forms[form][2]}
            </label>
            <p class="message animated hideOP"> sorry wrong data</p>`
        });
        view.newElement(login, "button", {
            id: "login__trigger",
            class: "login__trigger",
            onclick: `changeForm("${forms[form][1]}")`
        }, {
            innerText: forms[form][1]
        });
        if (animated) {
            view.addClass(view.$("#login"), "hideOP", 600);
            view.addClass(view.$(".loginBG"), "hideOP", 600);
        }
    }



    paintAdminTable(elements, users) {
        const table = view.$("#table");
        table.innerHTML = "";

        view.newElement(table, "thead").innerHTML = users ?
            `<tr>
        <th>Username</th>
        <th>Type</th>
        <th>Password</th>
        <th>Delete</th>
        </tr>` :
            `<tr>
        <th>Description</th>
        <th>Price</th>
        <th>In Stock</th>
        <th>Delete</th>
            <th>Update</th>
        </tr>`;
        let body = view.newElement(table, "tbody");
        for (let i = 0; i < elements.length; i++) {
            body.innerHTML += (users) ? this.tableUser(elements[i]) : this.tableItem(elements[i]);
        }
    }


    tableItem(item) {
        return `<tr class="animated"  data-id="${item.id}">
            <td data-title="desc" contenteditable="true">${item.description}</td>
            <td data-title="price" contenteditable="true">${item.price.toFixed(2)}</td>
            <td data-title="qty" contenteditable="true">${item.qty}</td>        
        
             <td data-title="delete" class='admin__deleteBtn' >
                <button class="ad__Btn" data-id="${item.id}" onclick="deleteItem(this.dataset.id, this.parentNode.parentNode)">
                    <svg class='ad__Btn--icon ad__Btn--icon_primary'>
                        <use xlink:href='./img/sprites.svg#icon-minus-circle'></use>
                    </svg>
                </button>
            </td>
            
            <td data-title="persist">
                <button class="ad__Btn"  data-id="${item.id}" onclick="saveItem(this.dataset.id, this.parentNode.parentNode)">
                    <svg class='ad__Btn--icon ad__Btn--icon_success'>
                        <use xlink:href='./img/sprites.svg#icon-pencil'></use>
                    </svg>
                </button>
            </td>
        </tr>`;
    }

    tableUser(user) {
        return ` <tr class="animated" data-id="${user.username}">
      
        <td data-title="username">${user.username.u_capsWord()}</td>
        <td data-title="type">
            <button  data-id="${user.username}"  class="ad__Btn primaryH"
            onclick="changeType(this.dataset.id)"> ${user.type}</button>
        </td>
        <td data-title="password">
        <button class="ad__Btn"  data-id="${user.username}" onclick="resetPass(this.dataset.id)">
            <svg class='ad__Btn--icon ad__Btn--icon_success'>
                <use xlink:href='./img/sprites.svg#icon-lock'></use>
            </svg>
        </button>
    </td>
        
        <td data-title="delete" class='admin__deleteBtn'>
        <button class="ad__Btn" data-id="${user.username}" onclick="deleteUser(this.dataset.id, this.parentNode.parentNode)">
            <svg class='ad__Btn--icon ad__Btn--icon_primary'>
                <use xlink:href='./img/sprites.svg#icon-minus-circle'></use>
            </svg>
        </button>
        </td>
       
    </tr>`;
    }

    addNewUserInput() {
        let fields = view.$(".newItem__input");
        fields.innerHTML = `
        <button class="ad__Btn" onclick="control.closeFields()">
            <svg class='ad__Btn--icon ad__Btn--icon_primary'>
                <use xlink:href='./img/sprites.svg#icon-chev-r'></use>
            </svg>
        </button>
        <input type="text" placeholder="Username" />
        <input type="password"  placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />`;
        return fields;
    }

    addNewItemInput() {
        let fields = view.$(".newItem__input");
        fields.innerHTML = `
        <button class="ad__Btn" onclick="control.closeFields()">
            <svg class='ad__Btn--icon ad__Btn--icon_primary'>
                <use xlink:href='./img/sprites.svg#icon-minus-circle'></use>
            </svg>
        </button>
        <input type="text" data-title="desc" placeholder="Description" />
        <input type="text" data-title="price" placeholder="Price" />
        <input type="text" data-title="qty" placeholder="in Stock" />`;
        return fields;
    }

    paintInvoice () {
        let inv = view.getTotal();


        //setBF just once
            let bg = view.newElement(null, "span", {
                class: "loginBG"
            });
            view.$(".container").insertBefore(bg, invoice);



        invoice.innerHTML = `
        <div class="invoice__header">
            <div>
                <h1 class="heading-1 primary ">Ztore. Invoice</h1>
                <h3 class="heading-4" style="padding-left:1rem;">Billed to: ${model.getUser()}</h3>
            </div>
        </div>
        <button class="exit__btn" onclick="sendInvoice()">
            <svg class='exit__btn--icon'>
                <use xlink:href='./img/sprites.svg#icon-paper-plane'></use>
            </svg>
        </button>

        <div id="adminContainer">
            <div class="table-responsive-vertical ">
                <table id="tableInvoice" class="table table-hover  table-mc-light-blue shadow-z-1">
                    <thead id="table__header">
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="tBody">
                    ${this.invoiceItems()}
                    ${this.invoiceTotal(inv)}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="info">
            <h3 class="heading-4">Date: ${view.dateToString()}</h3>
            <h3 class="heading-4 primary">Total: $
            ${view.formatMoney(inv.total + inv.gst + inv.shipping - inv.discount)}</h3>
        </div>`;
    }

    invoiceItems () {
        let str = ""
        for (const c of model.getJSON("Cart")) {
            let i = model.getItem(c.id, "Ztore");
            str+= `<tr>
                <td>${i.description}</td>
                <td>${i.price}</td>
                <td>${c.qty}</td>
                <td>$ ${view.formatMoney(i.price *c.qty)}</td>
            </tr>`;
        }
        return str;
    }

    invoiceTotal (inv) {
        let str = ""
        for (const key in inv) {
            if (key !== "total") 
            str += `<tr>
                <td></td>
                <td></td>
                <td>${key.u_capsWord()}</td>
                <td>$ ${view.formatMoney(inv[key])}</td>
            </tr>`;
        }
        return str;
    }
}