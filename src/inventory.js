class Inventory {

    constructor() {
        this._inventory = {};
    }

    /**
     * Get Item
     * @param {String} itemSKU
     * @return {Item}
     */
    getItem(itemSKU) {
        if (!this._inventory[itemSKU]) {
            throw new Error(`Item with SKU ${itemSKU} not found in the inventory`);
        }

        return this._inventory[itemSKU];
    }

    /**
     * Save Item
     * @param {Item} item
     */
    saveItem(item) {
        this._inventory[item.getSKU()] = item;
    }

    /**
     * Update item price
     * @param {String} itemSKU
     * @param {Number} newPrice
     */
    updateItemPrice(itemSKU, newPrice) {
        this._inventory[itemSKU].setPrice(newPrice);
    }

    /**
     * Update item offers
     * @param {String} itemSKU
     * @param {Array.<Offer>|Offer} newOffers
     */
    updateItemOffers(itemSKU, newOffers) {
        this._inventory[itemSKU].setOffers(newOffers);
    }

    /**
     * Delete item
     * @param {String} itemSKU
     */
    deleteItem(itemSKU) {
        delete this._inventory[itemSKU];
    }
}

module.exports = Inventory;