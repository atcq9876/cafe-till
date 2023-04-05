class Payment {
  constructor(priceCalculator, cash) {
    this.#validatePriceCalculator(priceCalculator);
    this._priceCalculator = priceCalculator;
    this._cash = cash;
  }

  #validatePriceCalculator(priceCalculator) {
    if (typeof priceCalculator !== 'object' || typeof priceCalculator.calculateTotalPrice !== 'function') {
      throw new Error('The first argument should be an instance of PriceCalculator');
    }
  }
}

module.exports = Payment;
