const menu = require('./cafeMenu.json');

class ItemDiscount {
  constructor(itemName, discountPercent) {
    if (typeof itemName !== 'string') throw new Error('itemName must be a string');
    
    const menuItems = Object.keys(menu[0].prices[0]);
    let menuContainsItem = menuItems.includes(itemName) ? true : false;
    if (menuContainsItem === false) throw new Error('That item is not on the menu');

    this._itemName = itemName;
    this._discountPercent = discountPercent;
  }

  getItemName() {
    return this._itemName;
  }

  getDiscountPercent() {
    return this._discountPercent;
  }
}

module.exports = ItemDiscount;
