const TotalPriceDiscount = require('./totalPriceDiscount');

describe('TotalPriceDiscount', () => {
  it('initialises correctly', () => {
    const minTotalPrice = 50;
    const discountPercent = 5;
    const totalPriceDiscount = new TotalPriceDiscount(minTotalPrice, discountPercent);

    expect(totalPriceDiscount._minTotalPrice).toEqual(50);
    expect(totalPriceDiscount._discountPercent).toEqual(5);
  })

  it('gets the minTotalPrice', () => {
    const minTotalPrice = 40;
    const discountPercent = 10;
    const totalPriceDiscount = new TotalPriceDiscount(minTotalPrice, discountPercent);

    expect(totalPriceDiscount.getMinTotalPrice()).toEqual(40);
  })

  it('gets the discountPercent', () => {
    const minTotalPrice = 30;
    const discountPercent = 20;
    const totalPriceDiscount = new TotalPriceDiscount(minTotalPrice, discountPercent);

    expect(totalPriceDiscount.getDiscountPercent()).toEqual(20);
  })

  test(('throws error if minTotalPrice is not a number'), () => {
    const minTotalPrice = '30';
    const discountPercent = 20;
    
    expect(() => {
      const totalPriceDiscount = new TotalPriceDiscount(minTotalPrice, discountPercent);
    }).toThrow('minTotalPrice must be a number');
  })

  test(('throws error if minTotalPrice is below zero'), () => {
    const minTotalPrice = -1;
    const discountPercent = 10;
    
    expect(() => {
      const totalPriceDiscount = new TotalPriceDiscount(minTotalPrice, discountPercent);
    }).toThrow('minTotalPrice must not be a negative number');
  })

  test(('throws error if minTotalPrice is not a number'), () => {
    const minTotalPrice = 30;
    const discountPercent = '20';
    
    expect(() => {
      const totalPriceDiscount = new TotalPriceDiscount(minTotalPrice, discountPercent);
    }).toThrow('discountPercent must be a number');
  })
})
