const menu = require('./cafeMenu.json');

class PriceCalculator {
  constructor(order) {
    this.#validateOrder(order);
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

  #validateOrder(order) {
    if (typeof order !== 'object') throw new Error('Only objects can be passed to Receipt');
    if (typeof order.getTable !== 'function') throw new Error('Only instances of Order can be passed to Receipt');
    if (order.getItems().length === 0) throw new Error('Orders must contain at least one item');
  }
}

module.exports = PriceCalculator;
