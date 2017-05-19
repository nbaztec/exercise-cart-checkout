const MockInventory = require('./inventory.mock');

const cartItems = [
    {
        item: MockInventory.getItem('A'),
        quantity: 3,
    },
    {
        item: MockInventory.getItem('B'),
        quantity: 2,
    },
    {
        item: MockInventory.getItem('C'),
        quantity: 3,
    },
    {
        item: MockInventory.getItem('D'),
        quantity: 2,
    },
    {
        item: MockInventory.getItem('A'),
        quantity: 4,
    },
    {
        item: MockInventory.getItem('B'),
        quantity: 3,
    },
];

module.exports = cartItems;