const Receipt = require('./receipt');
const Order = require('./order');

// Mock Order class
jest.mock('./order', () => {
  return jest.fn().mockImplementation(() => {
    return {
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getItems: jest.fn().mockReturnValue(['Cafe Latte', 'Cafe Latte', 'Tea']),
      setTable: jest.fn(),
      setNames: jest.fn(),
      getTable: jest.fn().mockReturnValue(2),
      getNames: jest.fn().mockReturnValue('Andy, Anna'),
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



describe('Receipt', () => { 
  it('initialises correctly if passed an Order object', () => {
    const mockOrder = new Order();
    const receipt = new Receipt(mockOrder);

    expect(receipt._order).toEqual(mockOrder);
    expect(receipt._order.getTable()).toEqual(2);
    expect(receipt._order.getNames()).toEqual('Andy, Anna');
    expect(receipt._order.getItems()).toEqual(['Cafe Latte', 'Cafe Latte', 'Tea']);
  })

  test(('throws error if argument is not an order'), () => {
    expect(() => {
      new Receipt('string');
    }).toThrow('Only objects can be passed to Receipt');
  })

  test(('throws error if argument is not an order'), () => {
    expect(() => {
      new Receipt(new String('string'));
    }).toThrow('Only instances of Order can be passed to Receipt');
  })

  it('prints the basic cafe info on the receipt', () => {
    const mockOrder = new Order();
    const receipt = new Receipt(mockOrder);

    expect(receipt.printReceipt()).toContain('The Coffee Connection\n\n123 Lakeside Way\nPhone: +1 (650) 360-0708');
  })

  it('prints the table number and names on the receipt', () => {
    const mockOrder = new Order();
    const receipt = new Receipt(mockOrder);

    expect(receipt.printReceipt()).toContain('Table: 2 / [4]\nAndy, Anna');
  })

  it('prints the date and time on the receipt', () => {
    const mockOrder = new Order();
    const receipt = new Receipt(mockOrder);
    const spy = jest.spyOn(receipt, 'getDateAndTime');
    spy.mockReturnValue('2023.11.10 08:08:43');

    expect(receipt.printReceipt()).toContain('2023.11.10 08:08:43');

    spy.mockRestore();
  })

  it('prints the ordered items on the receipt', () => {
    const mockOrder = new Order();
    const receipt = new Receipt(mockOrder);

    expect(receipt.printReceipt()).toContain('Cafe Latte');
    expect(receipt.printReceipt()).toContain('2 x 4.75');
    expect(receipt.printReceipt()).toContain('Tea');
    expect(receipt.printReceipt()).toContain('1 x 3.65');
  })
})
