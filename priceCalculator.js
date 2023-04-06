const menu = require('./cafeMenu.json');

class PriceCalculator {
  constructor(order, totalPriceDiscount = null, itemDiscount = null) {
    this.#validateOrder(order);
    this._order = order;
    this.#validateTotalPriceDiscount(totalPriceDiscount)
    this._totalPriceDiscount = totalPriceDiscount;
    this._itemDiscount = itemDiscount;
  }

  calculateTotalPrice() {
    const items = this._order.getItems();
    let totalPrice = 0;
    items.forEach((item) => {
      let itemPrice = menu[0].prices[0][item];
      if (this._itemDiscount && item.includes(this._itemDiscount.getItemName())) {
        totalPrice += this.#applyItemDiscount(itemPrice);
      } else {
        totalPrice += itemPrice;
      }
    })
    if (this._totalPriceDiscount) totalPrice = this.#applyTotalPriceDiscount(totalPrice);
    return totalPrice;
  }

  calculateTax() {
    const tax = Math.round((100 * this.calculateTotalPrice()) * 0.0864) / 100;
    return tax;
  }

  #applyItemDiscount(itemPrice) {
    let discountedPrice = ((itemPrice / 100) * (100 - this._itemDiscount.getDiscountPercent()));
    discountedPrice = Math.round(discountedPrice * 100) / 100;
    return discountedPrice;
  }

  #applyTotalPriceDiscount(totalPrice) {
    let discountedPrice = ((totalPrice / 100) * (100 - this._totalPriceDiscount.getDiscountPercent()));
    discountedPrice = Math.round(discountedPrice * 100) / 100;
    return discountedPrice;
  }

  #validateOrder(order) {
    if (typeof order !== 'object' || typeof order.getTable !== 'function') {
      throw new Error('The first argument should be an instance of Order');
    } else if (order.getItems().length === 0) {
      throw new Error('Orders must contain at least one item');
    }
  }

  #validateTotalPriceDiscount(totalPriceDiscount) {
    if (totalPriceDiscount !== null && typeof totalPriceDiscount.getMinTotalPrice !== 'function') {
      throw new Error('The second argument should be an instance of TotalPriceDiscount');
    }
  }
}

module.exports = PriceCalculator;
