'use strict';

const chai = require('chai');
const expect = chai.expect;

const Offer = require('../src/offer');
const Item = require('../src/item');

describe('Item Class', () => {

    describe('SKU', () => {

        const negativeCases = [
            true,
            1,
            undefined,
            null,
            [1],
            {foo: 1},
            '',
            ' ',
            '123',
            '_A',
            '-A',
            'A.B',
        ];

        for (let negativeCase of negativeCases) {
            it(`should throw error when sku = ${negativeCase}`, () => {
                expect(() => new Item(negativeCase, 1)).to.throw(Error);
            });
        }

        const positiveCases = [
            'A123',
            'A',
            'a12',
            'a',
            'A-1',
            'A_2',
            'ABCD_',
        ];

        for (let positiveCase of positiveCases) {
            it(`should not throw error when sku = ${positiveCase}`, () => {
                expect(() => new Item(positiveCase, 1)).to.not.throw(Error);
            });
        }
    });

    describe('Price', () => {

        it('should throw error when price < 0', () => {
            expect(() => new Item('A', -1)).to.throw(Error);
        });

        it('should not throw error when price = 0', () => {
            expect(() => new Item('A', 0)).to.not.throw(Error);
        });

        // Can add more negative tests for isNaN, isInfinite and other edge cases

        it('should not throw error when price > 0', () => {
            expect(() => new Item('A', 1)).to.not.throw(Error);
        });
    });

    describe('Offers', () => {

        it('should add to array when single offer is provided', () => {
            const offer = new Offer(2, 20);
            const item = new Item('A', 15, offer);
            expect(item.getOffers()[0]).to.be.equal(offer);
        });

        it('should add to array when list of offers is provided', () => {
            const offers = [
                new Offer(2, 20),
                new Offer(3, 25),
            ];

            const item = new Item('A', 15, offers);

            offers.forEach((offer, index) => {
                expect(item.getOffers()[index]).to.be.equal(offer);
            });
        });

        it('should have offers as an array when no offer is provided', () => {
            const offer = new Offer(2, 20);
            const item = new Item('A', 15, null);
            expect(item.getOffers()).to.be.an('array');
        });
    });
});