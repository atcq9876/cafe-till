class Payment {
  constructor(priceCalculator, cash) {
    if (typeof priceCalculator !== 'object') throw new Error('The first argument should be an instance of PriceCalculator');
    this._priceCalculator = priceCalculator;
    this._cash = cash;
  }
}

module.exports = Payment;
