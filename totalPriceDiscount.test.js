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
})
