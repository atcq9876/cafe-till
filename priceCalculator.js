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
    return totalPrice;
  }

  calculateTax() {
    const tax = parseFloat((this.calculateTotalPrice() * 0.0864).toFixed(2));
    return tax;
  }
}

module.exports = PriceCalculator;
