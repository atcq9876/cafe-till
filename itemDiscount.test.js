const ItemDiscount = require('./itemDiscount');

// Mock menu object
const menu = [
  {
    "shopName": "The Coffee Connection",
    "address": "123 Lakeside Way",
    "phone": "+1 (650) 360-0708",
    "prices": [
      {
        "Cafe Latte": 4.75,
        "Flat White": 4.75,
        "Cappucino": 3.85,
        "Single Espresso": 2.05,
        "Double Espresso": 3.75,
        "Americano": 3.75,
        "Cortado": 4.55,
        "Tea": 3.65,
        "Choc Mudcake": 6.40,
        "Choc Mousse": 8.20,
        "Affogato": 14.80,
        "Tiramisu": 11.40,
        "Blueberry Muffin": 4.05,
        "Chocolate Chip Muffin": 4.05,
        "Muffin Of The Day": 4.55
      }
    ]
  }
];

// Mock the import of the cafeMenu
jest.mock('./cafeMenu.json', () => menu);

describe('ItemDiscount', () => {
  it('initializes correctly', () => {
    const itemName = 'Blueberry Muffin';
    const discountPercent = 10;
    const itemDiscount = new ItemDiscount(itemName, discountPercent);
    
    expect(itemDiscount._itemName).toEqual('Blueberry Muffin');
    expect(itemDiscount._discountPercent).toEqual(10);
  })

  it('gets itemName', () => {
    const itemName = 'Cafe Latte';
    const discountPercent = 5;
    const itemDiscount = new ItemDiscount(itemName, discountPercent);
    
    expect(itemDiscount.getItemName()).toEqual('Cafe Latte');
  })

  it('gets discountPercent', () => {
    const itemName = 'Cafe Latte';
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

  test(('throws error if menu does not contain itemName'), () => {
    const itemName = 'test';
    const discountPercent = 20;
    
    expect(() => {
      new ItemDiscount(itemName, discountPercent);
    }).toThrow('That item is not on the menu');
  })
})
