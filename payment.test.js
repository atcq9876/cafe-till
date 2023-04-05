const Payment = require('./payment');
const PriceCalculator = require('./priceCalculator');

const createMockPriceCalculator = (totalPrice) => {
  return {
    calculateTotalPrice: () => totalPrice
  }
}

describe('Payment', () => {
  it('initialises and sets paymentCalculator and cash instance variables', () => {
    const mockPriceCalculator = createMockPriceCalculator(15.15)
    const cash = 20;
    const payment = new Payment(mockPriceCalculator, cash);

    expect(payment._priceCalculator).toEqual(mockPriceCalculator);
    expect(payment._cash).toEqual(cash);
  })

  // validate priceCalculator
  test(('throws error if priceCalculator is not an object'), () => {
    expect(() => {
      new Payment('test', 10);
    }).toThrow('The first argument should be an instance of PriceCalculator');
  })
})
