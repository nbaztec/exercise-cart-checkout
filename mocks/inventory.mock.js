const MockItems = require('./items.mock');
const Inventory = require('../src/inventory');

const inventory = new Inventory();

// Add the items
for (let item of MockItems) {
    inventory.saveItem(item);
}


module.exports = inventory;