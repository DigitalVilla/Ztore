"use strict";
const model = new myModel();
const view = new myView();
const control = new controller();
const fetcher = new myFetch();
const order = view.$(".checkout");


control.init();

const header = view.$("#header");
const shop = view.$("#shop");
const ztore = view.$("#ztore");
const cart = view.$("#cart");
const btns = view.$("#sidebar").children;
const loginForm = view.$("#loginForm");
const checkoutBtn = view.$("#checkoutBtn");
const invoice = view.$(".invoice");

// Event Functions
if (loginForm.length != 0)
    addEventListener('submit', e => {
        e.preventDefault();
        control.loginHandler(e);
    });
const changeForm = (form) => control.formHandler(form);

// ztore items 
const plusQty = (item) => control.itemHandler(item, true);
const minusQty = (item) => control.itemHandler(item, false);
const toCartBtn = (item) => control.cartBtnHandler(item);
//inCart actions
const plusCart = (item) => control.cartItemHandler(item, true);
const minusCart = (item) => control.cartItemHandler(item, false);
const removeItem = (item) => control.cartDeleteHandler(item);
checkoutBtn.addEventListener("click", e => control.checkoutHandler(e));

//Admin button controller to swap tables
const fillTable = (value, btn) => {
    control.printTableHandler(value) //fetch the set table from DB
    view.toggleOn((view.$(".tableBtn")), btn) // change the style of btn to active
};

//admin pannel
const resetPass = (u) => control.userActionsHandler(u, "reset");
const deleteUser = (u, row) => control.userActionsHandler(u, "delete", row);
const changeType = (u) => control.userActionsHandler(u, "change");
const addUser = (u) => control.addNewHandler(u, "change");

const deleteItem = (i, row) => control.deleteItemHandler(i, row);
const saveItem = (i, row) => control.saveItemHandler(i, row);
const addItem = (u) => control.addNewHandler(u, "change");
const sendInvoice = () => control.sendInvoiceHandler();


/// Window actions
window.addEventListener('scroll', () => {
    if (header.getBoundingClientRect().y <= 0)
        view.toggleOn(btns, btns[0]);
    if (shop.getBoundingClientRect().y <= 0)
        view.toggleOn(btns, btns[1]);
    if (ztore.getBoundingClientRect().y <= 0)
        view.toggleOn(btns, btns[2]);
    if (cart.getBoundingClientRect().y <= 0)
        view.toggleOn(btns, btns[3]);
})

//nav bar actions
btns[0].addEventListener('click', (e) => view.toggleOn(btns, btns[0]));
btns[1].addEventListener('click', (e) => view.toggleOn(btns, btns[1]));
btns[2].addEventListener('click', (e) => view.toggleOn(btns, btns[2]));
btns[3].addEventListener('click', (e) => view.toggleOn(btns, btns[3]));
btns[4].addEventListener('click', (e) => {
    view.toggleOn(btns, btns[4]);
    control.logOutHandler();
});

