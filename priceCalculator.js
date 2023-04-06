const menu = require('./cafeMenu.json');

class PriceCalculator {
  constructor(order, totalPriceDiscount = null) {
    this.#validateOrder(order);
    this._order = order;
    // VALIDATE TOTALPRICEDISCOUNT
    if (totalPriceDiscount !== null && typeof totalPriceDiscount !== 'object') {
      throw new Error('The second argument should be an instance of TotalPriceDiscount');
    } else if (totalPriceDiscount !== null && typeof totalPriceDiscount.getMinTotalPrice !== 'function') {
      throw new Error('The second argument should be an instance of TotalPriceDiscount');
    }
    this._totalPriceDiscount = totalPriceDiscount;
  }

  calculateTotalPrice() {
    const items = this._order.getItems();
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += menu[0].prices[0][item];
    })
    if (this._totalPriceDiscount) totalPrice = this.#applyTotalPriceDiscount(totalPrice);
    return totalPrice;
  }

  calculateTax() {
    const tax = parseFloat((this.calculateTotalPrice() * 0.0864).toFixed(2));
    return tax;
  }

  #applyTotalPriceDiscount(totalPrice) {
    let discountedPrice = ((totalPrice / 100) * (100 - this._totalPriceDiscount.getDiscountPercent()));
    discountedPrice = parseFloat(discountedPrice.toFixed(2));
    return discountedPrice;
  }

  #validateOrder(order) {
    if (typeof order !== 'object' || typeof order.getTable !== 'function') {
      throw new Error('The first argument should be an instance of Order');
    } else if (order.getItems().length === 0) {
      throw new Error('Orders must contain at least one item');
    }
  }
}

module.exports = PriceCalculator;
