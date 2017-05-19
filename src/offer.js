class Offer {

    /**
     * @param {Number} quantity
     * @param {Number} price
     */
    constructor(quantity, price) {

        if (quantity <= 0 || !Number.isInteger(quantity)) {
            throw new Error(`Quantity should be a positive integer`);
        }

        if (price < 0) {
            throw new Error(`Price cannot be negative`);
        }

        this._quantity = quantity;
        this._price = price;
    }

    /**
     * Get price
     * @return {Number}
     */
    getPrice() {
        return this._price;
    }

    /**
     * Get quantity
     * @return {Number}
     */
    getQuantity() {
        return this._quantity;
    }
}

module.exports = Offer;