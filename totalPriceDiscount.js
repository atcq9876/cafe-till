class TotalPriceDiscount {
  constructor(minTotalPrice, discountPercent) {
    if (typeof minTotalPrice !== 'number') throw new Error('minTotalPrice must be a number');
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
