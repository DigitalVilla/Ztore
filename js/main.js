"use strict";
// document.addEventListener("click", (e)=> {
//     console.log(e.target.className);

// })




document.addEventListener("click", e => {})




function plusQty(item) {
    // console.log(item);

    itemHandler(item, true)
}

function minusQty(item) {
    itemHandler(item, false)
}

function itemHandler(item, add) {
    let zItem = getItem(item.parentNode.parentNode.id);
    let itemQty = item.parentNode;

    let input = itemQty.children[1];
    let inStock = zItem.inStock;
    let qty = validateQty(input.value, inStock);

    if (qty > 0) {
        qty = (add) ? (qty + 1 > inStock) ? inStock : ++qty :
            (qty - 1 < 1) ? 0 : --qty;
    } else
        qty = 0;
    qty = (qty == 0) ? 1 : qty;
    input.value = qty; //update input
    zItem.inStock = parseInt(inStock - input.value);
    updatePrice(itemQty, qty * zItem.price);
    updateStock(itemQty, zItem.inStock);
}


function toCart(item) {
    // get div item__quantity
    let itemQty = item.previousSibling.previousSibling;
    //get inout
    let input = itemQty.children[1];
    // validate that at lest one items is enetered
    if (input.value == "") {
        input.classList.add("empty");
        setTimeout(() => {
            input.classList.remove("empty");
        }, 500);
        return;
    }


    let dbItem = getItem(item.getAttribute('data-id').split(" ")[0]);
    let inStock = item.parentNode.firstElementChild.firstElementChild;

    inStock = parseInt(inStock.innerText);
    let toCart = dbItem.inStock - inStock;
    dbItem.inStock = inStock;


    updatePrice(itemQty, dbItem.price); //reset price
    itemQty.children[1].value = 1; //reset input

    //update cart
    updateZtore(dbItem);
    updateCart(dbItem.id, toCart);
    updateCartBtn();
}


function updateCart(itemId, inCart) {
    let cart = getUser() + "Cart";

    //if cart does not exist create a new array
    cart = JSON.parse(sessionStorage.getItem(cart)) || [];

    // create new cart element
    let items = {
        user: getUser(),
        itemId,
        inCart
    };

    // if cart has the same item already
    let match = !1;
    for (const i of cart) {
        if (i.itemId === itemId) {
            i.inCart += inCart
            match = !0;
        }
    }
    // if no match found, append or add to head => .unshift(item);
    if (!match) {
        cart.push(items);
    }

    //persist
    sessionStorage.setItem(getUser() + "Cart", JSON.stringify(cart));

    ///PERSIST TO DB 
    loadZtore();
    loadCart();

}


function getItem(id) {
    for (const key of JSON.parse(sessionStorage.getItem((getUser() + "Ztore")))) {
        if (key.id == id)
            return key;
    }
}
function updateZtoreCart(item) {
    let ztore = JSON.parse(sessionStorage.getItem(getUser()+"Ztore"))
    let cart = JSON.parse(sessionStorage.getItem(getUser()+"Cart"))
    console.log(ztore,cart);
    

}
function updateZtore(item) {
    let ztore = getUser() + "Ztore";
    ztore = JSON.parse(sessionStorage.getItem(ztore))

    for (const z of ztore) {
        if (z.id == item.id) {
            z.inStock = item.inStock;
        }
    }

    sessionStorage.setItem(getUser() + "Ztore", JSON.stringify(ztore));
}

















/**
 * This method returns a valid number within the range [1 to limit] 
 * If the value cannot be parsed into int. it returns a [-1 ]
 * @param {string} value the number to evaluate
 * @param {string} limit the max number it can grow  
 */
function validateQty(value, limit) {
    if (!isNaN(+value) && isFinite(value)) {
        limit = parseInt(limit);
        let val = parseInt(value);
        return (val > limit) ? limit : (val < 1) ? 1 : val;
    }
    return -1;
}



function updatePrice(element, price) {
    let tag = element.nextSibling.lastElementChild;
    tag.innerText = formatMoney(price);
}


function updateStock(element, inStock) {
    let badge = element.parentNode.firstElementChild.firstElementChild;
    if (badge.classList.contains("item__img--inStock"))
        badge.innerText = inStock;
}