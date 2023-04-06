const ItemDiscount = require('./itemDiscount');

describe('ItemDiscount', () => {
  it('initializes correctly', () => {
    const itemName = 'muffin';
    const discountPercent = 10;
    const itemDiscount = new ItemDiscount(itemName, discountPercent);
    
    expect(itemDiscount._itemName).toEqual('muffin');
    expect(itemDiscount._discountPercent).toEqual(10);
  })

  it('gets itemName', () => {
    const itemName = 'Latte';
    const discountPercent = 5;
    const itemDiscount = new ItemDiscount(itemName, discountPercent);
    
    expect(itemDiscount.getItemName()).toEqual('Latte');
  })

  it('gets discountPercent', () => {
    const itemName = 'Latte';
    const discountPercent = 5;
    const itemDiscount = new ItemDiscount(itemName, discountPercent);
    
    expect(itemDiscount.getDiscountPercent()).toEqual(5);
  })

  test(('throws error if itemName is not a string'), () => {
    const itemName = 10;
    const discountPercent = 20;
    
    expect(() => {
      new ItemDiscount(itemName, discountPercent);
    }).toThrow('itemName must be a string');
  })
})
