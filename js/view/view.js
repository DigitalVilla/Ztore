class myView {

    constructor () {
        this.cartBtn = this.$("#cart_btn");
        this.sideNav = this.$("#sidebar");
    }
    updateZtoreCart(item) {
        let ztore = JSON.parse(sessionStorage.getItem(getUser() + "Ztore"))
        let cart = JSON.parse(sessionStorage.getItem(getUser() + "Cart"))
        console.log(ztore, cart);
    }

    //DOM METHODS
    $(query) {
        let select = document.querySelectorAll(query)
        return (select.length === 1) ? select[0] : select;
    }

    updateCartBtn(cart) {
        const len = cart.length;
        const cartBadge = this.cartBtn.lastElementChild.lastElementChild;

        this.addClass(cartBadge,"toCart",700);
        cartBadge.style.opacity = 1;
        cartBadge.innerText = len;
    }

    updateQtyInput(input, qty) {
        input.value = qty;
    }

    updatePriceLabel(element, price) {
        let tag = element.nextSibling.lastElementChild;
        tag.innerText = formatMoney(price);
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
        if (timer != 0) {
            setTimeout(() => {
                element.classList.remove(className);
            }, timer);
        }
    }
    /**
     * @param {*} element to add  the new class
     * @param {*} className to add
     * @param {*} timer to remove class  optional.
     */
    toggleOn(list, element, className) {
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


    loadItems(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].inStock == 0) continue;
            const item = this.newElement(ztore, "div", {
                class: "item",
                id: arr[i].id,
                "data-id": arr[i].inStock
            }) //main div
            const fig = this.newElement(item, "figure", {
                class: "item__img"
            }, {
                innerHTML: `<span class='item__img--inStock'>
            ${arr[i].inStock}</span>`
            }) // image holder
            fig.style.backgroundImage = `linear-gradient(rgba(255, 0, 94, 0.1), rgba(212, 0, 179, 0.3)),
            url(./img/${arr[i].item.replace(/\s/g,'').toLowerCase()}.png)`; //image style
            item.innerHTML += `<h5 class="item__name">${arr[i].item}</h5>
             <p class="item__description">${this.lorem(18)}</p>`; // title and dummy text;     
            this.newElement(item, "div", {
                class: "item__quantity"
            }, {
                innerHTML: `<span onClick="minusQty(this)"><svg >
                <use xlink:href='img/sprites.svg#icon-minus'></use>
            </svg> </span> 
            <input type="text" placeholder="1" pattern="\d{1,5}">
            <span onClick="plusQty(this)"><svg>
              <use xlink:href='img/sprites.svg#icon-plus'></use>
            </svg></span>`
            }); //quantity selector 
            this.newElement(item, "div", {
                class: "item__price"
            }, {
                innerHTML: `<svg><use xlink:href='img/sprites.svg#icon-dollar'></use></svg>
            <span class="total">${formatMoney(arr[i].price)}</span>`
            }); // price display
            this.newElement(item, "button", {
                class: "btn",
                type: "submit",
                "data-id": arr[i].id,
                onClick: "toCartBtn(this)"
            }, {
                innerText: "Add To Cart"
            }); // button to cart
        }
    }



    loadCartItems(arr) {
        for (let i = 0; i < arr.length; i++) {
            let zItem = model.getItem(arr[i].id);
            // <div class="cart__item" id="card1">
            let item = this.newElement(cart, "div", {
                class: "cart__item",
                "data-id": arr[i].id,
                "data-inCart": arr[i].inCart
            })

            const fig = this.newElement(item, "figure", {
                class: "cart__item--fig"
            }, {
                innerHTML: `<div class="span">
            <svg><use xlink:href='img/sprites.svg#icon-close'></use>
            </svg></div>`
            }) // image holder

            fig.style.backgroundImage = `linear-gradient(rgba(255, 0, 94, 0.1), rgba(212, 0, 179, 0.3)),
            url(./img/${(zItem.item).replace(/\s/g,'').toLowerCase()}.png)`; //image style
            let content = this.newElement(item, "div", {
                class: "cart__item--content"
            }, {
                innerHTML: `<div class="cart__item--details">
                <p>${zItem.item}</p></div>`
            })

            let controls = this.newElement(content, "div", {
                class: "cart__item--controls",
                id: zItem.id,
            });

            this.newElement(controls, "div", {
                class: "item__quantity"
            }, {
                innerHTML: `<span onClick="minusCart(this)"><svg >
                <use xlink:href='img/sprites.svg#icon-minus'></use>
            </svg> </span> 
            <input type="text" value="${arr[i].inCart}" pattern="\d{1,5}">
            <span onClick="plusCart(this);"><svg>
              <use xlink:href='img/sprites.svg#icon-plus'></use>
            </svg></span>`
            }); //quantiity selector 
            this.newElement(controls, "div", {
                class: "item__price"
            }, {
                innerHTML: `<svg><use xlink:href='img/sprites.svg#icon-dollar'></use></svg>
            <span class="total">${formatMoney(zItem.price*arr[i].inCart)}</span>`
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
}


//lazyloading
let isVisible = (elem) => {
    let bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};


function scrollToElement(pageElement) {
    var positionX = 0,
        positionY = 0;

    while (pageElement != null) {
        positionX += pageElement.offsetLeft;
        positionY += pageElement.offsetTop;
        pageElement = pageElement.offsetParent;
        window.scrollTo(positionX, positionY);
    }
}

// var pageElement = document.getElementById("insideNYTimesHeader");
// scrollToElement(pageElement);

// document.getElementById("elementID").scrollIntoView();

// // location.hash = "elementId"