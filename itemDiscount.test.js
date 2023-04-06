const ItemDiscount = require('./itemDiscount');

describe('ItemDiscount', () => {
  it('initializes correctly', () => {
    const itemName = 'muffin';
    const discountPercent = 10;
    const itemDiscount = new ItemDiscount(itemName, discountPercent);
    
    expect(itemDiscount._itemName).toEqual('muffin');
    expect(itemDiscount._discountPercent).toEqual(10);
  })
})
