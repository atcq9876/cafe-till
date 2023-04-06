class TotalPriceDiscount {
  constructor(minTotalPrice, discountPercent) {
    this.#validateMinTotalPrice(minTotalPrice);
    this._minTotalPrice = minTotalPrice;
    this.#validateDiscountPercent(discountPercent);
    this._discountPercent = discountPercent;
  }

  getMinTotalPrice() {
    return this._minTotalPrice;
  }

  getDiscountPercent() {
    return this._discountPercent;
  }

  #validateMinTotalPrice(minTotalPrice) {
    if (typeof minTotalPrice !== 'number') throw new Error('minTotalPrice must be a number');
    if (minTotalPrice < 0) throw new Error('minTotalPrice must not be a negative number');
  }

  #validateDiscountPercent(discountPercent) {
    if (typeof discountPercent !== 'number') throw new Error('discountPercent must be a number');
    if (discountPercent < 1 || discountPercent > 100) throw new Error('discountPercent must be between 1 and 100');
  }
}

module.exports = TotalPriceDiscount;
