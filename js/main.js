"use strict";
const model = new myModel();
const view = new myView();
const control = new controller();
const fetcher = new myFetch();
const header = view.$("#header");
const shop = view.$("#shop");
const ztore = view.$("#ztore");
const cart = view.$("#cart");
const btns = view.$("#sidebar").children;

control.loadDatabase();
// Event Functions
const plusQty = (item) => control.itemHandler(item, true);
const minusQty = (item) => control.itemHandler(item, false);
const toCartBtn = (item) => control.cartBtnHandler(item);
const plusCart = (item) => control.cartItemHandler(item, true);
const minusCart = (item) => control.cartItemHandler(item, false);

window.addEventListener('scroll', () => {
    if (header.getBoundingClientRect().y <= 0)
        view.toggleOn(btns, btns[0], "active");
    if (shop.getBoundingClientRect().y <= 0)
        view.toggleOn(btns, btns[1], "active");
    if (ztore.getBoundingClientRect().y <= 0)
        view.toggleOn(btns, btns[2], "active");
    if (cart.getBoundingClientRect().y <= 0)
        view.toggleOn(btns, btns[3], "active");
})

btns[0].addEventListener('click', (e) => view.toggleOn(btns, btns[0], "active"));
btns[1].addEventListener('click', (e) => view.toggleOn(btns, btns[1], "active"));
btns[2].addEventListener('click', (e) => view.toggleOn(btns, btns[2], "active"));
btns[3].addEventListener('click', (e) => view.toggleOn(btns, btns[3], "active"));
btns[4].addEventListener('click', (e) => view.toggleOn(btns, btns[4], "active"));