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
})
