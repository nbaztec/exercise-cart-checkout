'use strict';

const chai = require('chai');
const expect = chai.expect;

const Offer = require('../src/offer');
const Item = require('../src/item');
const Cart = require('../src/cart');

describe('Cart Class', () => {

    describe('addItem', () => {

        const itemA = new Item('A', 1);
        const itemB = new Item('B', 1);

        let cart;

        beforeEach(() => {
            cart = new Cart();
        });

        it('should throw error when quantity is not an integer', () => {
            expect(() => cart.addItem(itemA, 1.5)).to.throw(Error);
        });

        it('should save items', () => {
            cart.addItem(itemA, 1);
            cart.addItem(itemB, 2);

            expect(cart.getItem(itemA.getSKU()).item.getSKU()).to.be.equal(itemA.getSKU());
            expect(cart.getItem(itemA.getSKU()).quantity).to.be.equal(1);

            expect(cart.getItem(itemB.getSKU()).item.getSKU()).to.be.equal(itemB.getSKU());
            expect(cart.getItem(itemB.getSKU()).quantity).to.be.equal(2);
        });

        it('should update item quantity when adding same item', () => {
            cart.addItem(itemA, 1);
            cart.addItem(itemB, 2);
            cart.addItem(itemA, 3);

            expect(cart.getItem(itemA.getSKU()).item.getSKU()).to.be.equal(itemA.getSKU());
            expect(cart.getItem(itemA.getSKU()).quantity).to.be.equal(4);

            expect(cart.getItem(itemB.getSKU()).item.getSKU()).to.be.equal(itemB.getSKU());
            expect(cart.getItem(itemB.getSKU()).quantity).to.be.equal(2);
        });
    });

    describe('getItems', () => {

        it('should save items', () => {
            const itemA = new Item('A', 1);
            const itemB = new Item('B', 1);

            const cart = new Cart();

            cart.addItem(itemA, 1);
            cart.addItem(itemB, 2);

            const cartItems = cart.getItems();
            expect(Object.keys(cartItems).length).to.be.equal(2);
            expect(cartItems[itemA.getSKU()]).to.not.be.equal(undefined);
            expect(cartItems[itemB.getSKU()]).to.not.be.equal(undefined);
        });
    });

    describe('deleteItem', () => {

        const itemA = new Item('A', 1);
        const itemB = new Item('B', 1);

        let cart;

        beforeEach(() => {
            cart = new Cart();
            cart.addItem(itemA, 1);
            cart.addItem(itemB, 2);
        });

        it('should delete item', () => {
            cart.deleteItem(itemA.getSKU());
            expect(() => cart.getItem(itemA.getSKU())).to.throw(Error);
            expect(() => cart.getItem(itemB.getSKU())).to.not.throw(Error);
        });

        it('should behave properly when deleting non-existing item', () => {
            // delete the existing item
            cart.deleteItem(itemA.getSKU());
            expect(() => cart.getItem(itemA.getSKU())).to.throw(Error);

            // attempt to delete the item again
            expect(() => cart.deleteItem(itemA.getSKU())).to.not.throw(Error);
            expect(() => cart.getItem(itemB.getSKU())).to.not.throw(Error);
        });

        it('should delete multiple items', () => {
            cart.deleteItem(itemA.getSKU());
            cart.deleteItem(itemB.getSKU());
            expect(() => cart.getItem(itemA.getSKU())).to.throw(Error);
            expect(() => cart.getItem(itemB.getSKU())).to.throw(Error);
        });

    });

    describe('updateItemQuantity', () => {

        const itemA = new Item('A', 1);
        const itemB = new Item('B', 1);

        let cart;

        beforeEach(() => {
            cart = new Cart();
            cart.addItem(itemA, 1);
            cart.addItem(itemB, 2);
        });

        it('should throw error when quantity < 0', () => {
            const updatedQty = -1;
            expect(() => cart.updateItemQuantity(itemA.getSKU(), updatedQty)).to.throw(Error);
        });

        it('should throw error when quantity = 0', () => {
            const updatedQty = 0;
            expect(() => cart.updateItemQuantity(itemA.getSKU(), updatedQty)).to.throw(Error);
        });

        it('should throw error when quantity is not an integer', () => {
            const updatedQty = 1.5;
            expect(() => cart.updateItemQuantity(itemA.getSKU(), updatedQty)).to.throw(Error);
        });

        it('should update the item quantity', () => {
            const updatedQty = 5;
            cart.updateItemQuantity(itemA.getSKU(), updatedQty);
            expect(cart.getItem(itemA.getSKU()).quantity).to.be.equal(updatedQty);
            expect(cart.getItem(itemB.getSKU()).quantity).to.be.equal(2);
        });
    });

    describe('calculateTotal', () => {

        const offerA = new Offer(3, 120);
        const offerB = new Offer(2, 45);
        const itemA = new Item('A', 50, [offerA, offerB]);
        const itemB = new Item('B', 30, offerB);
        const itemC = new Item('C', 60);

        const expectedTotal = 485;

        let cart;

        beforeEach(() => {
            cart = new Cart();
            cart.addItem(itemA, 7);
            cart.addItem(itemB, 3);
            cart.addItem(itemC, 2);
        });

        it('should calculate total with offers', () => {
            expect(cart.calculateTotal()).to.be.equal(expectedTotal);
        });
    });

    describe('verbose output', () => {

        // hook into console.log and detect if extra lines were printed apart from (item_count+1)
        let _log = console.log;
        let linesOut = 0;

        before(() => {
           process.env.VERBOSE = 1;
           console.log = function() {
               linesOut++;
               _log.apply(console, arguments);
           };
        });

        after(() => {
            console.log = _log;
            delete process.env.VERBOSE;
        });

        it('should provide verbose output when VERBOSE=1', () => {
            const cart = new Cart();
            cart.addItem(new Item('A', 50), 8);
            cart.addItem(new Item('B', 30, new Offer(2, 40)), 3);
            cart.addItem(new Item('C', 30, new Offer(3, 50)), 3);
            cart.calculateTotal();
            expect(linesOut).to.be.gt(4);
        });
    })

});