let lorem = `Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. expedita non libero minima amet fugit.`;
const ztore = f$.select("#ztore");
const cart = f$.select("#cart");

let data = '/js/data.json';
f$.fetcher(data, "get")
    .then(items => {
        loadItems(items.u_shuffle())
        sessionStorage.setItem(getUser() + "Ztore", JSON.stringify(items))
        loadCart();
    })





function loadItems(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].inStock == 0) continue;
        const item = f$.newElement(ztore, "div", {
            class: "item",
            id: arr[i].id,
            "data-id": arr[i].inStock
        }) //main div
        const fig = f$.newElement(item, "figure", {
            class: "item__img"
        }, {
            innerHTML: `<span class='item__img--inStock'>
            ${arr[i].inStock}</span>`
        }) // image holder
        fig.style.backgroundImage = `linear-gradient(rgba(255, 0, 94, 0.1), rgba(212, 0, 179, 0.3)),
            url(./img/${arr[i].item.replace(/\s/g,'').toLowerCase()}.png)`; //image style
        item.innerHTML += `<h5 class="item__name">${arr[i].item}</h5>
             <p class="item__description">${lorem}</p>`; // title and dummy text;     
        f$.newElement(item, "div", {
            class: "item__quantity"
        }, {
            innerHTML: `<span onClick="minusQty(this)"><svg >
                <use xlink:href='img/sprites.svg#icon-minus'></use>
            </svg> </span> 
            <input type="text" placeholder="1" pattern="\d{1,5}">
            <span onClick="plusQty(this)"><svg>
              <use xlink:href='img/sprites.svg#icon-plus'></use>
            </svg></span>`
        }); //quantiity selector 
        f$.newElement(item, "div", {
            class: "item__price"
        }, {
            innerHTML: `<svg><use xlink:href='img/sprites.svg#icon-dollar'></use></svg>
            <span class="total">${formatMoney(arr[i].price)}</span>`
        }); // price display
        f$.newElement(item, "button", {
            class: "btn",
            type: "submit",
            "data-id": arr[i].id,
            onClick: "toCart(this)"
        }, {
            innerText: "Add To Cart"
        }); // button to cart
    }
}

function getUser() {
    return "villa";
}

function loadZtore() {
    let items = JSON.parse(sessionStorage.getItem(getUser() + "Ztore"))
    ztore.innerHTML = "";
    loadItems(items)
}

function loadCart() {
    let items = JSON.parse(sessionStorage.getItem(getUser() + "Cart"))
    cart.innerHTML = "";
    if (items != null) {
        loadCartItems(items)
        updateCartBtn();
    }
}




function loadCartItems(arr) {

    for (let i = 0; i < arr.length; i++) {
        let zItem = getItem(arr[i].itemId);
        // <div class="cart__item" id="card1">
        let item = f$.newElement(cart, "div", {
            class: "cart__item",
            "data-id":arr[i].itemId,
            "data-inCart": arr[i].inCart
        })

        const fig = f$.newElement(item, "figure", {
            class: "cart__item--fig"
        }, {
            innerHTML: `<div class="span">
            <svg><use xlink:href='img/sprites.svg#icon-close'></use>
            </svg></div>`
        }) // image holder

        fig.style.backgroundImage = `linear-gradient(rgba(255, 0, 94, 0.1), rgba(212, 0, 179, 0.3)),
            url(./img/${(zItem.item).replace(/\s/g,'').toLowerCase()}.png)`; //image style
        let content = f$.newElement(item, "div", {
            class: "cart__item--content"
        }, {
            innerHTML: `<div class="cart__item--details">
                <p>${zItem.item}</p></div>`
        })


        let controls = f$.newElement(content, "div", {
            class: "cart__item--controls",
            id: zItem.id,
        });

        f$.newElement(controls, "div", {
            class: "item__quantity"
        }, {
            innerHTML: `<span onClick="Cart.minusQty(this)"><svg >
                <use xlink:href='img/sprites.svg#icon-minus'></use>
            </svg> </span> 
            <input type="text" value="${arr[i].inCart}" pattern="\d{1,5}">
            <span onClick="Cart.plusQty(this);"><svg>
              <use xlink:href='img/sprites.svg#icon-plus'></use>
            </svg></span>`
        }); //quantiity selector 
        f$.newElement(controls, "div", {
            class: "item__price"
        }, {
            innerHTML: `<svg><use xlink:href='img/sprites.svg#icon-dollar'></use></svg>
            <span class="total">${formatMoney(zItem.price*arr[i].inCart)}</span>`
        }); // price display
    }
}


function updateCartBtn() {
    let cart = getUser() + "Cart";
    cart = JSON.parse(sessionStorage.getItem(cart));
    const items = cart.length;
    
    const cartBtn = f$.select("#cart_btn");
    const cartBadge = cartBtn.lastElementChild.lastElementChild;


   cartBadge.style.opacity = 1;
   cartBadge.classList.add("toCart"); 
   setTimeout(() => {
    cartBadge.classList.remove("toCart");
}, 700);
   cartBadge.innerText = items;



}