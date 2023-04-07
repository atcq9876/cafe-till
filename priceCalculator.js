const menu = require('./cafeMenu.json');

class PriceCalculator {
  constructor(order, itemDiscount = null, totalPriceDiscount = null) {
    this.#validateOrder(order);
    this._order = order;
    this.#validateItemDiscount(itemDiscount);
    this._itemDiscount = itemDiscount;
    this.#validateTotalPriceDiscount(totalPriceDiscount);
    this._totalPriceDiscount = totalPriceDiscount;
    this._itemsDiscountValue = 0;
    this._completeDiscountValue = 0;
  }

  calculateTotalPrice() {
    const items = this._order.getItems();
    let totalPrice = 0;
    this._itemDiscountValue = 0;
    items.forEach((item) => {
      let itemPrice = menu[0].prices[0][item];
      if (this._itemDiscount && item.includes(this._itemDiscount.getItemName())) {
        totalPrice += this.#applyItemDiscount(itemPrice);
      } else {
        totalPrice += itemPrice;
      }
    })
    if (this._totalPriceDiscount && totalPrice >= this._totalPriceDiscount.getMinTotalPrice()) {
      totalPrice = this.#applyTotalPriceDiscount(totalPrice);
    }
    return totalPrice;
  }

  calculateTax() {
    const tax = Math.round((100 * this.calculateTotalPrice()) * 0.0864) / 100;
    return tax;
  }

  getDiscountValue() {
    return this._completeDiscountValue;
  }

  #applyItemDiscount(itemPrice) {
    let discountedPrice = ((itemPrice / 100) * (100 - this._itemDiscount.getDiscountPercent()));
    discountedPrice = Math.round(discountedPrice * 100) / 100;
    // this._itemsDiscountValue += (itemPrice - discountedPrice);
    return discountedPrice;
  }

  #applyTotalPriceDiscount(totalPrice) {
    let discountedPrice = ((totalPrice / 100) * (100 - this._totalPriceDiscount.getDiscountPercent()));
    discountedPrice = Math.round(discountedPrice * 100) / 100;
    this._completeDiscountValue = (totalPrice - discountedPrice) + this._itemsDiscountValue;
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

  #validateItemDiscount(itemDiscount) {
    if (itemDiscount !== null && typeof itemDiscount.getItemName !== 'function') {
      throw new Error('The second argument should be an instance of itemDiscount');
    }
  }
}

module.exports = PriceCalculator;
