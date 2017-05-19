const MockCartItems = require('./mocks/cartItems.mock');
const Cart = require('./src/cart');

const cart = new Cart();

// Add mock items to cart
for (let cartItem of MockCartItems) {
    cart.addItem(cartItem.item, cartItem.quantity);
}

// calculate total
const total = cart.calculateTotal();

console.log(`Total amount: ${total}`);
