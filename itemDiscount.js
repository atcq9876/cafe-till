class ItemDiscount {
  constructor(itemName, discountPercent) {
    this._itemName = itemName;
    this._discountPercent = discountPercent;
  }

  getItemName() {
    return this._itemName;
  }
}

module.exports = ItemDiscount;
