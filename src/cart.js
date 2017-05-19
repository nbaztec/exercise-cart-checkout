class Cart {

    /**
     * @typedef {Object} CartItem
     * @property {Item} item
     * @property {Number} quantity
     */

    constructor() {
        this._cart = {};
    }

    /**
     * Add item to checkout cart
     * @param {Item} item
     * @param {Number} quantity
     */
    addItem(item, quantity) {

        if (quantity <= 0 || !Number.isInteger(quantity)) {
            throw new Error('Quantity must be a positive integer');
        }

        if (!this._cart[item.getSKU()]) {
            this._cart[item.getSKU()] = {
                item,
                quantity,
            };

            return quantity;
        }

        return this._cart[item.getSKU()].quantity += quantity;
    }

    /**
     * Update item quantity
     * @param {String} itemSKU
     * @param {Number} quantity
     * @return {Number}
     */
    updateItemQuantity(itemSKU, quantity) {
        if (quantity <= 0 || !Number.isInteger(quantity)) {
            throw new Error('Quantity must be a positive integer');
        }

        return this._cart[itemSKU].quantity = quantity;
    }

    /**
     * Delete item
     * @param {String} itemSKU
     */
    deleteItem(itemSKU) {
        delete this._cart[itemSKU];
    }

    /**
     * Get cart item
     * @param itemSKU
     * @return {CartItem}
     */
    getItem(itemSKU) {
        if (!this._cart[itemSKU]) {
            throw new Error(`Item with SKU ${itemSKU} not found in the cart`);
        }

        return this._cart[itemSKU];
    }

    /**
     * Gets all cart items
     * @return {Object.<String, CartItem>}
     */
    getItems() {
        return this._cart;
    }

    /**
     * Calculate cart total
     * @return {Number}
     */
    calculateTotal() {
        let total = 0;
        for (let sku of Object.keys(this._cart)) {
            const cartItem = this._cart[sku];
            const totalPrice = cartItem.item.calculateBestPrice(cartItem.quantity);

            console.log(`> ${sku} = ${totalPrice} (price)`);

            total += totalPrice;
        }

        return total;
    }
}

module.exports = Cart;