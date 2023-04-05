class Payment {
  constructor(priceCalculator, cash) {
    this.#validatePriceCalculator(priceCalculator);
    if (typeof cash !== 'number') throw new Error('Cash must be a number');
    this._priceCalculator = priceCalculator;
    this._cash = cash;
  }

  #validatePriceCalculator(priceCalculator) {
    if (typeof priceCalculator !== 'object' || typeof priceCalculator.calculateTotalPrice !== 'function') {
      throw new Error('The first argument should be an instance of PriceCalculator');
    } else if (!priceCalculator.calculateTotalPrice()) {
      throw new Error('Price calculator must contain order price data');
    }
  }
}

module.exports = Payment;
