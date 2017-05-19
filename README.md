## Exercise - Cart Checkout Calculator
Calculates the total price based on the cart and multiple offers applied to each item.

### Example
If the inventory consists of 2 items:

* Beer, EUR 5 (Offers: 2 for EUR 6, 6 for EUR 20)
* Water, EUR 2 (Offers: 5 for EUR 8)

And the cart looks like:

* Beer x 10
* Water x 6

Then the total should be:

* Beer: 6 for EUR 20 +  4 for EUR 12 (EUR 6 per 2 units)
* Water: 5 for EUR 8 + 1 for EUR 2

So the total comes out to be: **EUR 42**
### Install
```
npm install
```

### Start
Update the item, offers & inventory mocks within the `mocks/` directory. Then run `index.js`.
```
npm start
```

### Test
```
npm test
```

### Coverage
```
npm run test-coverage
```
Tip: 100% test coverage