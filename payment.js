class Payment {
  constructor(priceCalculator, cash) {
    this._priceCalculator = priceCalculator;
    this._cash = cash;
  }
}

module.exports = Payment;
