class ItemDiscount {
  constructor(itemName, discountPercent) {
    if (typeof itemName !== 'string') throw new Error('itemName must be a string');
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
