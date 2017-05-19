'use strict';

const chai = require('chai');
const expect = chai.expect;

const Offer = require('../src/offer');

describe('Offer Class', () => {

    describe('Quantity', () => {

        it('should throw error when quantity is < 0', () => {
            expect(() => new Offer(-1, 1)).to.throw(Error);
        });

        it('should throw error when quantity is 0', () => {
            expect(() => new Offer(0, 1)).to.throw(Error);
        });

        it('should throw error when quantity is not an integer', () => {
            expect(() => new Offer(1.5, 1)).to.throw(Error);
        });

        it('should not throw error when quantity > 0', () => {
            expect(() => new Offer(1, 1)).to.not.throw(Error);
        });

    });

    describe('Price', () => {

        it('should throw error when price < 0', () => {
            expect(() => new Offer(1, -1)).to.throw(Error);
        });

        it('should not throw error when price = 0', () => {
            expect(() => new Offer(1, 0)).to.not.throw(Error);
        });

        // Can add more negative tests for isNaN, isInfinite and other edge cases

        it('should not throw error when price > 0', () => {
            expect(() => new Offer(1, 1)).to.not.throw(Error);
        });
    });

});