const MockOffers = require('./offers.mock');
const Item = require('../src/item');

// Define the items
const items = [
    new Item('A', 50, [MockOffers.offerA, MockOffers.offerB]),
    new Item('B', 30, MockOffers.offerB),
    new Item('C', 60),
    new Item('D', 15)
];


module.exports = items;