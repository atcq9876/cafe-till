class TotalPriceDiscount {
  constructor(minTotalPrice, discountPercent) {
    this._minTotalPrice = minTotalPrice;
    this._discountPercent = discountPercent;
  }

  getMinTotalPrice() {
    return this._minTotalPrice;
  }

  getDiscountPercent() {
    return this._discountPercent;
  }
}

module.exports = TotalPriceDiscount;
