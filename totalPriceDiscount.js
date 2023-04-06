class TotalPriceDiscount {
  constructor(minTotalPrice, discountPercent) {
    if (typeof minTotalPrice !== 'number') throw new Error('minTotalPrice must be a number');
    if (minTotalPrice < 0) throw new Error('minTotalPrice must not be a negative number');
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
