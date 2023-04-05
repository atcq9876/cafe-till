class Payment {
  constructor(priceCalculator, cash) {
    this.#validatePriceCalculator(priceCalculator);
    this._priceCalculator = priceCalculator;
    this.#validateCash(cash);
    this._cash = cash;
  }

  calculateChange() {
    const totalPrice = this._priceCalculator.calculateTotalPrice();
    const change = parseFloat((this._cash - totalPrice).toFixed(2));
    return change;
  }

  #validatePriceCalculator(priceCalculator) {
    if (typeof priceCalculator !== 'object' || typeof priceCalculator.calculateTotalPrice !== 'function') {
      throw new Error('The first argument should be an instance of PriceCalculator');
    } else if (!priceCalculator.calculateTotalPrice()) {
      throw new Error('Price calculator must contain order price data');
    }
  }

  #validateCash(cash) {
    if (typeof cash !== 'number') {
      throw new Error('Cash must be a number');
    } else if (cash < 0) {
      throw new Error('Cash must not be less than zero');
    } else if (cash < this._priceCalculator.calculateTotalPrice()) {
      throw new Error('Cash must not be less than total price');
    }
  }
}

module.exports = Payment;
