const menu = require('./cafeMenu.json');

class ItemDiscount {
  constructor(itemName, discountPercent) {
    this.#validateItemName(itemName);
    this._itemName = itemName;
    this.#validateDiscountPercent(discountPercent);
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
    const menuContainsItem = menuItems.includes(itemName) ? true : false;
    const menuContainsItemType = this.#validateItemType(itemName);
    if (menuContainsItem === false && menuContainsItemType === false) {
      throw new Error('That item is not on the menu');
    }
  }

  // Checks for item subgroups
  #validateItemType(itemName) {
    const itemTypes = ['Muffin', 'Coffee', 'Tea', 'Drink', 'Food'];
    return itemTypes.includes(itemName) ? true : false;
  }

  #validateDiscountPercent(discountPercent) {
    if (typeof discountPercent !== 'number') {
      throw new Error('discountPercent must be a number');
    } else if (discountPercent < 1 || discountPercent > 100) {
      throw new Error('discountPercent must be between 1 and 100');
    }
  }
}

module.exports = ItemDiscount;
