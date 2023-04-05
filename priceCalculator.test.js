const PriceCalculator = require('./priceCalculator');

// Function to create a mock order
const createMockOrder = (items) => {
  return jest.fn().mockImplementation(() => {
    return {
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getItems: jest.fn().mockReturnValue(items),
      setTable: jest.fn(),
      setNames: jest.fn(),
      getTable: jest.fn().mockReturnValue(2),
      getNames: jest.fn().mockReturnValue('Jim, Jen'),
    };
  });
}

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
    const MockOrder = createMockOrder(['Cortado', 'Americano', 'Americano']);
    const order = new MockOrder();
    const priceCalculator = new PriceCalculator(order);

    expect(priceCalculator._order.getTable()).toEqual(2);
    expect(priceCalculator._order.getNames()).toEqual('Jim, Jen');
    expect(priceCalculator._order.getItems()).toEqual(['Cortado', 'Americano', 'Americano']);
  })

  it('calculates the total price of an order that does not end in a 0 decimal', () => {
    const MockOrder = createMockOrder(['Cortado', 'Americano', 'Americano']);
    const order = new MockOrder();
    const priceCalculator = new PriceCalculator(order);

    expect(priceCalculator.calculateTotalPrice()).toEqual(12.05);
  })

  it('calculates the total price for a different order', () => {
    const MockOrder = createMockOrder(['Cafe Latte', 'Cappucino']);
    const order = new MockOrder();
    const priceCalculator = new PriceCalculator(order);

    expect(priceCalculator.calculateTotalPrice()).toEqual(8.60);
  })

  it('calculates the tax of an order', () => {
    const MockOrder = createMockOrder(['Cortado', 'Americano', 'Americano']);
    const order = new MockOrder();
    const priceCalculator = new PriceCalculator(order);

    expect(priceCalculator.calculateTax()).toEqual(1.04);
  })

  it('calculates the tax of a different order', () => {
    const MockOrder = createMockOrder(['Cafe Latte', 'Cappucino']);
    const order = new MockOrder();
    const priceCalculator = new PriceCalculator(order);

    expect(priceCalculator.calculateTax()).toEqual(0.74);
  })

  // This and the below test are workarounds for directly checking if the object
  // is an instance of Order as a mockedOrder is not an instance of Order
  test(('throws error if argument is not an object'), () => {
    expect(() => {
      new PriceCalculator('string');
    }).toThrow('The first argument should be an instance of Order');
  })

  test(('throws error if argument does not contain a function of Order object'), () => {
    expect(() => {
      new PriceCalculator(new String('string'));
    }).toThrow('The first argument should be an instance of Order');
  })

  test(('throw error if order is empty'), () => {
    const emptyOrder = {
      getTable: () => 1,
      getItems: () => []
    };
    
    expect(() => {
      new PriceCalculator(emptyOrder);
    }).toThrow('Orders must contain at least one item');
  })
})
