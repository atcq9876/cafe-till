class ItemDiscount {
  constructor(itemName, discountPercent) {
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
