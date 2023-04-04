const menu = require('./cafeMenu.json');

class PriceCalculator {
  constructor(order) {
    this._order = order;
  }

  calculateTotalPrice() {
    const items = this._order.getItems();
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += menu[0].prices[0][item];
    })
    // totalPrice = Math.round(totalPrice * 100) / 100;
    return totalPrice;
  }
}

module.exports = PriceCalculator;
