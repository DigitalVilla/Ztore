class controller {

    constructor() {

    }

    itemHandler(item, add) {
        //get item from session storage
        let zItem = model.getItem(item.parentNode.parentNode.id);
        let parentNode = item.parentNode;

        //get controller
        let input = parentNode.children[1];
        let inStock = zItem.inStock;
        let qty = model.validateQty(input.value, inStock);

        if (qty > 0) {
            qty = (add) ? (qty + 1 > inStock) ? inStock : ++qty :
                (qty - 1 < 1) ? 0 : --qty;
        } else
            qty = 0;
        qty = (qty == 0) ? 1 : qty;

        // zItem.inStock = parseInt(inStock - input.value); // might not be needed
        view.updateQtyInput(input, qty);
        view.updatePriceLabel(parentNode, qty * zItem.price);
        view.updateStockBadge(parentNode, inStock - input.value);
    }

    cartItemHandler(item, add) {
        //get item from session storage
        let zItem = model.getItem(item.parentNode.parentNode.id);
        let parentNode = item.parentNode;
        console.log(zItem);
        return;
        

        //get controller
        let input = parentNode.children[1];
        let inStock = zItem.inStock;
        let qty = model.validateQty(input.value, inStock);

        if (qty > 0) {
            qty = (add) ? (qty + 1 > inStock) ? inStock : ++qty :
                (qty - 1 < 1) ? 0 : --qty;
        } else
            qty = 0;
        qty = (qty == 0) ? 1 : qty;

        // zItem.inStock = parseInt(inStock - input.value); // might not be needed
        view.updateQtyInput(input, qty);
        view.updatePriceLabel(parentNode, qty * zItem.price);
        view.updateStockBadge(parentNode, inStock - input.value);
    }


    cartBtnHandler(item) {
        // get div item__quantity
        let parentNode = item.previousSibling.previousSibling;
        let input = parentNode.children[1]; //get input

        // validate that at lest one item is entered
        if (input.value == "") {
            view.addClass(input, "empty"); // update view 
            return;
        }
        // getItem from localZtore
        let dbItem = model.getItem(item.getAttribute('data-id').split(" ")[0]);
        // get current inStock value from item's badge
        let inStock = item.parentNode.firstElementChild.firstElementChild;
        inStock = parseInt(inStock.innerText);
        //calculate number of elements going to cart
        let toCart = dbItem.inStock - inStock;

        //persist local storage
        dbItem.inStock = inStock;
        model.updateLocalZtore(dbItem);
        //persist local Cart id and number of elements
        model.updateLocalCart(dbItem.id, toCart);

        this.persistDatabaseB();
    }

    loadZtore() {
        let items = JSON.parse(sessionStorage.getItem(getUser() + "Ztore"))
        ztore.innerHTML = "";
        loadItems(items)
    }

    loadCart() {
        let items = JSON.parse(sessionStorage.getItem(getUser() + "Cart"))
        cart.innerHTML = "";
        if (items != null) {
            loadCartItems(items)
            updateCartBtn();
        }
    }

    loadDatabase() {
        this.persistDatabaseB(); 
        return;
    
        // Fetch user's data
        fetcher.API('/js/data/data.json', "get")
            .then(items => {
                model.persistLocal(items, "Ztore");
                view.loadItems(items.u_shuffle());
            })
        // Fetch user's cart
        fetcher.API('/js/data/cart.json', "get")
            .then(cart => {
                model.persistLocal(cart, "Cart");
                view.loadCartItems(cart);
                view.updateCartBtn(cart);
            })
    }

    persistDatabaseB() {
        //  send updated local db to server 
        //fetch from server all db 

        // loadDatabase()

        /////temporal 
        let items = model.getJSON("Ztore");
        model.persistLocal(items, "Ztore");
        view.$("#ztore").innerHTML = "";
        view.loadItems(items);
        
        let cart = model.getJSON("Cart");
        view.$("#cart").innerHTML = "";
        model.persistLocal(cart, "Cart");
        view.loadCartItems(cart);
        view.updateCartBtn(cart);
    }

}