const menu = require('./cafeMenu.json');

class ItemDiscount {
  constructor(itemName, discountPercent) {
    this.#validateItemName(itemName);
    this._itemName = itemName;
    this._discountPercent = discountPercent;
  }

  getItemName() {
    return this._itemName;
  }

  getDiscountPercent() {
    return this._discountPercent;
  }

  #validateItemName(itemName) {
    if (typeof itemName !== 'string') throw new Error('itemName must be a string');
    // Check if item is on the menu or is a muffin (for general muffin discount)
    const menuItems = Object.keys(menu[0].prices[0]);
    let menuContainsItem = menuItems.includes(itemName) ? true : false;
    if (menuContainsItem === false && itemName !== 'Muffin') {
      throw new Error('That item is not on the menu');
    }
  }
}

module.exports = ItemDiscount;
