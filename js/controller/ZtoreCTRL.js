class ZtoreCTRL {

    constructor() {
        this.cartDb = "Cart";
        this.ztoreDb = "Ztore";
        this.url = "http://localhost:8084/ZtoresAPI/api/";
        this.toggle = false;
    }

    itemHandler(item, add) {
        //get item from session storage
        let zItem = model.getItem(item.parentNode.parentNode.id, this.ztoreDb);

        let parentNode = item.parentNode;

        //get controller
        let input = parentNode.children[1];
        let inStock = parseInt(zItem.qty);
        let qty = this.validateQty(input.value, inStock);
        qty = this.validateCounter(qty, inStock, add);

        view.updateQtyInput(input, qty);
        view.updatePriceLabel(parentNode, qty * zItem.price);
        view.updateStockBadge(parentNode, inStock - input.value);
    }

    cartItemHandler(item, add) {
        //get item from session ztore
        let zItem = model.getItem(item.parentNode.parentNode.id, this.ztoreDb);
        //get item from session cart
        let cItem = model.getItem(item.parentNode.parentNode.id, this.cartDb);
        let parentNode = item.parentNode;
        //get controller
        let input = parentNode.children[1];
        let qty = this.validateQty(input.value, zItem.qty += cItem.qty);
        qty = this.validateCounter(qty, zItem.qty, add);
        // updateGUI
        view.updateQtyInput(input, qty);
        view.updatePriceLabel(parentNode, qty * zItem.price);

        // persist LOCAL
        let inCart = parseInt(input.value)
        cItem.qty = inCart;
        model.updateItem(cItem, this.cartDb);
        let inStock = zItem.qty;
        inStock = (inStock == 0) ? 0 : inStock - inCart;
        zItem.qty = (inStock <= 0) ? 0 : inStock
        model.updateItem(zItem, this.ztoreDb);

        // Persist Global
        model.persistItem(zItem);
        model.persistToCart(zItem.id);

        //UPDATE VIEW
        view.loadItems(model.getJSON(this.ztoreDb));
        view.loadCartItems();
        view.updateOrder();
        view.updateCartBtn();
    }


    cartDeleteHandler(item) {
        let id = item.getAttribute('data-id').split(" ")[0];
        let cItem = model.getItem(id, this.cartDb);
        let zItem = model.getItem(id, this.ztoreDb);

        // persist local
        zItem.qty += cItem.qty;
        model.deleteItem(cItem, this.cartDb);
        model.updateItem(zItem, this.ztoreDb);
        // Persist Global
        model.persistItem(zItem);
        model.persistToCart(zItem.id);

        //UPDATE VIEW
        view.loadItems(model.getJSON(this.ztoreDb));
        view.loadCartItems();
        view.updateOrder();
        view.updateCartBtn();
    }


    cartBtnHandler(item) {
        let parentNode = item.previousSibling.previousSibling; // get div item__quantity
        let input = parentNode.children[1]; //get input with qty
        // validate that at lest one item is entered
        if (input.value == "") {
            view.addClass(input, "empty"); // update view red border animation 
            return;
        }
        // getItem from localZtore
        let dbItem = model.getItem(item.getAttribute('data-id').split(" ")[0], this.ztoreDb);
        // get current inStock value from item's badge
        let inStock = item.parentNode.firstElementChild.firstElementChild;
        inStock = parseInt(inStock.innerText);
        //calculate number of elements going to cart
        let toCart = dbItem.qty - inStock;
        //persist local storage
        dbItem.qty = inStock;
        model.updateItem(dbItem, this.ztoreDb);
        //persist local Cart id and number of elements
        model.updateToCart(dbItem.id, toCart);
        // persist mySQL 
        // send update data to db
        model.persistItem(dbItem);
        // send cart to db
        model.persistToCart(dbItem.id);

        input.value = "";
        view.updateOrder();
        view.loadCartItems();
        view.updateCartBtn();
    }


    // Fetch Ztore Items from API and display in  view
    loadDatabase() {
        fetcher.API(this.url + 'ztore/', "GET")
            .then(items => {
                model.persistLocal(items, this.ztoreDb);
                view.loadItems(items)
            });
    }
    // Fetch cart Items from API and display in  view
    loadUserCart() {
        fetcher.API(this.url + 'cart/' + model.getUser(), "GET")
            .then(items => {
                if (!fetcher.isEmpty(items)) {
                    model.persistLocal(items, this.cartDb);
                    setTimeout(() => {
                        view.loadCartItems(items)
                        view.updateCartBtn();
                    }, 500)
                } else
                    model.persistLocal([], this.cartDb);
                view.updateOrder();
            });
    }


    /**
     * This method returns a valid number within the range [1 to limit] 
     * If the value cannot be parsed into int. it returns a [-1 ]
     * @param {string} value the number to evaluate
     * @param {string} limit the max number it can grow  
     */
    validateQty(value, limit) {
        if (!isNaN(+value) && isFinite(value)) {
            limit = parseInt(limit);
            let val = parseInt(value);
            return (val > limit) ? limit : (val < 1) ? 1 : val;
        }
        return -1;
    }

    validateCounter(qty, inStock, add) {
        if (qty > 0) {
            qty = (add) ? (qty + 1 > inStock) ? inStock : ++qty :
                (qty - 1 < 1) ? 0 : --qty;
        } else
            qty = 0;
        return (qty == 0) ? 1 : qty;
    }

}