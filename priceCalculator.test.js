const PriceCalculator = require('./priceCalculator');
const Order = require('./order');

// Mock Order class
jest.mock('./order', () => {
  return jest.fn().mockImplementation(() => {
    return {
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getItems: jest.fn().mockReturnValue(['Cortado', 'Americano', 'Americano']),
      setTable: jest.fn(),
      setNames: jest.fn(),
      getTable: jest.fn().mockReturnValue(2),
      getNames: jest.fn().mockReturnValue('Jim, Jen'),
    };
  });
});

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

describe('PriceCalculator', () => {
  it('initialises and sets an order instance variable', () => {
    const mockedOrder = new Order();
    const priceCalculator = new PriceCalculator(mockedOrder);

    expect(priceCalculator._order.getTable()).toEqual(2);
    expect(priceCalculator._order.getNames()).toEqual('Jim, Jen');
    expect(priceCalculator._order.getItems()).toEqual(['Cortado', 'Americano', 'Americano']);
  })
})
