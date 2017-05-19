'use strict';

const chai = require('chai');
const expect = chai.expect;

const Offer = require('../src/offer');
const Item = require('../src/item');
const Inventory = require('../src/inventory');

describe('Inventory Class', () => {

    describe('saveItem', () => {

        const itemA = new Item('A', 1);
        const itemB = new Item('B', 1);
        const updatedItemA = new Item('A', 10);

        let inventory;

        beforeEach(() => {
            inventory = new Inventory();
        });

        it('should save item', () => {
            inventory.saveItem(itemA);
            expect(inventory.getItem(itemA.getSKU())).to.be.equal(itemA);
        });

        it('should save multiple items', () => {
            inventory.saveItem(itemA);
            inventory.saveItem(itemB);

            expect(inventory.getItem(itemA.getSKU())).to.be.equal(itemA);
            expect(inventory.getItem(itemB.getSKU())).to.be.equal(itemB);
        });

        it('should update item, if same SKU', () => {
            inventory.saveItem(itemA);
            inventory.saveItem(updatedItemA);
            expect(inventory.getItem(itemA.getSKU())).to.be.equal(updatedItemA);
        });

    });

    describe('deleteItem', () => {

        const itemA = new Item('A', 1);
        const itemB = new Item('B', 1);
        const updatedItemA = new Item('A', 10);

        let inventory;

        beforeEach(() => {
            inventory = new Inventory();
            inventory.saveItem(itemA);
            inventory.saveItem(itemB);
        });

        it('should delete item', () => {
            inventory.deleteItem(itemA.getSKU());
            expect(() => inventory.getItem(itemA.getSKU())).to.throw(Error);
            expect(() => inventory.getItem(itemB.getSKU())).to.not.throw(Error);
        });

        it('should behave properly when deleting non-existing item', () => {
            // delete the existing item
            inventory.deleteItem(itemA.getSKU());
            expect(() => inventory.getItem(itemA.getSKU())).to.throw(Error);

            // attempt to delete the item again
            expect(() => inventory.deleteItem(itemA.getSKU())).to.not.throw(Error);
            expect(() => inventory.getItem(itemB.getSKU())).to.not.throw(Error);
        });

        it('should delete multiple items', () => {
            inventory.deleteItem(itemA.getSKU());
            inventory.deleteItem(itemB.getSKU());
            expect(() => inventory.getItem(itemA.getSKU())).to.throw(Error);
            expect(() => inventory.getItem(itemB.getSKU())).to.throw(Error);
        });

    });

    describe('updateItemPrice', () => {

        const itemA = new Item('A', 1);
        const itemB = new Item('B', 1);

        let inventory;

        beforeEach(() => {
            inventory = new Inventory();
            inventory.saveItem(itemA);
            inventory.saveItem(itemB);
        });

        it('should update the item price', () => {
            const updatedPrice = 5;
            inventory.updateItemPrice(itemA.getSKU(), updatedPrice);
            expect(inventory.getItem(itemA.getSKU()).getPrice()).to.be.equal(updatedPrice);
            expect(inventory.getItem(itemB.getSKU()).getPrice()).to.be.equal(itemB.getPrice());
        });
    });

    describe('updateItemOffers', () => {

        const itemA = new Item('A', 1);
        const itemB = new Item('B', 1);

        let inventory;

        beforeEach(() => {
            inventory = new Inventory();
            inventory.saveItem(itemA);
            inventory.saveItem(itemB);
        });

        it('should update the item price', () => {
            const updatedOffer = new Offer(2, 20);
            inventory.updateItemOffers(itemA.getSKU(), updatedOffer);
            expect(inventory.getItem(itemA.getSKU()).getOffers().length).to.be.equal(1);
            expect(inventory.getItem(itemA.getSKU()).getOffers()[0]).to.be.equal(updatedOffer);
            expect(inventory.getItem(itemB.getSKU()).getOffers().length).to.be.equal(0);
        });
    });

});