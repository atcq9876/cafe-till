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

  // This and the below test are workarounds for directly checking if the object
  // is an instance of PriceCalculator as a mock is not a true instance
  test(('throws error if priceCalculator is not an object'), () => {
    expect(() => {
      new Payment('test', 10);
    }).toThrow('The first argument should be an instance of PriceCalculator');
  })

  test(('throws error if priceCalculator does not have a calculateTotalPrice function'), () => {
    expect(() => {
      new Payment(new String('Test'), 10);
    }).toThrow('The first argument should be an instance of PriceCalculator');
  })

  test(('throws error if priceCalculator does not have any price data'), () => {
    const mockPriceCalculator = createMockPriceCalculator();
    expect(() => {
      new Payment(mockPriceCalculator, 10);
    }).toThrow('Price calculator must contain order price data');
  })

  test(('it throws error if cash is not a number'), () => {
    const mockPriceCalculator = createMockPriceCalculator(15.00)
    const cash = '50';

    expect(() => {
      new Payment(mockPriceCalculator, cash);
    }).toThrow('Cash must be a number');
  })

  test(('it throws error if cash is less than 0'), () => {
    const mockPriceCalculator = createMockPriceCalculator(15.00)
    const cash = -1;

    expect(() => {
      new Payment(mockPriceCalculator, cash);
    }).toThrow('Cash must not be less than zero');
  })

  test(('it throws error if cash is less than total price'), () => {
    const mockPriceCalculator = createMockPriceCalculator(15.00)
    const cash = 10;

    expect(() => {
      new Payment(mockPriceCalculator, cash);
    }).toThrow('Cash must not be less than total price');
  })

  it('calculates change', () => {
    const mockPriceCalculator = createMockPriceCalculator(17.05)
    const cash = 20;
    const payment = new Payment(mockPriceCalculator, cash);

    expect(payment.calculateChange()).toEqual(2.95);
  })
})
