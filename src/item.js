const Offer = require('./offer');

class Item {

    /**
     *
     * @param {String} sku
     * @param {Number} price
     * @param {Array.<Offer>|Offer|null} [offers]
     */
    constructor(sku, price, offers) {
        this.setSKU(sku);
        this.setPrice(price);
        this.setOffers(offers);
    }

    /**
     * Return price
     * @return {Number}
     */
    getPrice() {
        return this._price;
    }

    /**
     * Set price
     * @param {Number} price
     */
    setPrice(price) {
        if (price < 0) {
            throw new Error('Price should be non-negative');
        }

        this._price = price;
    }

    /**
     * Get SKU
     * @return {String}
     */
    getSKU() {
        return this._sku;
    }

    /**
     * Set SKU
     * @param {String} sku
     */
    setSKU(sku) {
        if (! (sku instanceof String || typeof sku === 'string')) {
            throw new Error('SKU must be a string');
        }

        if (!/^[a-zA-Z][\w-]*$/.test(sku)) {
            throw new Error('SKU must start with a letter and must contain only alphanumeric digits and "_", "-"');
        }

        this._sku = sku;
    }

    /**
     * Get list of offers
     * @return {Array.<Offer>}
     */
    getOffers() {
        return this._offers;
    }

    /**
     * Set list of offser
     * @param {Array.<Offer>|Offer|null} offers
     */
    setOffers(offers) {
        offers = offers || [];

        // If single offer wrap it inside Array
        if (offers instanceof Offer) {
            offers = [offers];
        }

        // Sort offers in DESC order for optimal matching
        offers = offers.sort((a, b) => {
            return b - a;
        });

        this._offers = offers;
    }

    /**
     * Calculate total price
     * @param {Number} quantity
     * @return {Number}
     */
    calculateBestPrice(quantity) {

        // Return early with simple maths if no offers on the product
        if (this._offers.length === 0) {
            if (process.env.VERBOSE) {
                console.log(`> ${this._sku} : ${quantity} units (no offers)`);
                console.log(`\t[1 for ${this._price}] x ${quantity} = ${quantity * this._price}`);
            }

            return quantity * this._price;
        }

        let remainQty = quantity;
        let totalPrice = 0;

        if (process.env.VERBOSE) {
            console.log(`> ${this._sku} : ${remainQty} units`);
        }

        // Start by the initial quantity and begin applying offers based on quantity
        for (let offer of this._offers) {

            // Can break early since offers are stored in DESC order by quantity
            if (remainQty < offer.getQuantity()) {
                break;
            }

            const appliedQty = parseInt(remainQty / offer.getQuantity());
            remainQty = parseInt(remainQty % offer.getQuantity());

            // Get currently applied price and add it to total
            const curPrice = appliedQty * offer.getPrice();
            totalPrice += curPrice;

            if (process.env.VERBOSE) {
                console.log(`\t[${offer.getQuantity()} for ${offer.getPrice()}] x ${appliedQty} = ${curPrice}}`);
            }
        }

        if (remainQty) {
            // Evaluate price for remaining units
            totalPrice += remainQty * this._price;

            if (process.env.VERBOSE) {
                console.log(`\t[1 for ${this._price}] x ${remainQty} = ${remainQty * this._price}}`);
            }
        }

        return totalPrice;
    }
}


module.exports = Item;