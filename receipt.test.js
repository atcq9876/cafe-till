const Receipt = require('./receipt');
const Order = require('./order');
const PriceCalculator = require('./priceCalculator');
const Payment = require('./payment');

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

// Mock PriceCalculator class
jest.mock('./priceCalculator', () => {
  return jest.fn().mockImplementation(() => {
    return {
      calculateTotalPrice: jest.fn().mockReturnValue(13.15),
      calculateTax: jest.fn().mockReturnValue(1.14),
    }
  })
})

// Mock Payment class
jest.mock('./payment', () => {
  return jest.fn().mockImplementation((cash) => {
    return {
      calculateChange: jest.fn().mockReturnValue(parseFloat(cash - 13.15).toFixed(2)),
      getCash: jest.fn().mockReturnValue(cash)
    }
  })
})

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
    const mockPriceCalculator = new PriceCalculator();
    const receipt = new Receipt(mockOrder, mockPriceCalculator);

    expect(receipt._order).toEqual(mockOrder);
    expect(receipt._order.getTable()).toEqual(2);
    expect(receipt._order.getNames()).toEqual('Andy, Anna');
    expect(receipt._order.getItems()).toEqual(['Cafe Latte', 'Cafe Latte', 'Tea']);
  })

  // This and the below test are workarounds for directly checking if the object
  // is an instance of Order as a mockedOrder is not an instance of Order
  test(('throws error if argument is not an object'), () => {
    expect(() => {
      new Receipt('string');
    }).toThrow('The first argument should be an instance of Order');
  })

  test(('throws error if argument does not contain a function of Order object'), () => {
    expect(() => {
      new Receipt(new String('string'));
    }).toThrow('The first argument should be an instance of Order');
  })

  it('prints the basic cafe info on the receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);

    expect(receipt.printReceipt()).toContain('The Coffee Connection\n\n123 Lakeside Way\nPhone: +1 (650) 360-0708');
  })

  it('prints the table number and names on the receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);

    expect(receipt.printReceipt()).toContain('Table: 2 / [4]\nAndy, Anna');
  })

  it('prints the date and time on the receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);
    const spy = jest.spyOn(receipt, 'getDateAndTime');
    spy.mockReturnValue('2023.11.10 08:08:43');

    expect(receipt.printReceipt()).toContain('2023.11.10 08:08:43');

    spy.mockRestore();
  })

  it('prints the ordered items on the receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);

    expect(receipt.printReceipt()).toContain('Cafe Latte');
    expect(receipt.printReceipt()).toContain('2 x 4.75');
    expect(receipt.printReceipt()).toContain('Tea');
    expect(receipt.printReceipt()).toContain('1 x 3.65');
  })

  it('prints the total order price on the receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);

    expect(receipt.printReceipt()).toContain('Total:');
    expect(receipt.printReceipt()).toContain('$13.15');
  })

  it('prints tax on the receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);

    expect(receipt.printReceipt()).toContain('Tax:');
    expect(receipt.printReceipt()).toContain('$1.14');
  })

  it('prints the correct amount of whitespace between items and prices on receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);
    // Max 30 characters on one line
    // Max item length is 18 characters
    // Max 'quantity x price' length is 12 characters

    // ' Cafe Latte' (length = 11)   +   '2 x 4.75' (length = 8) = 19
    // 30 - 19 = 11
    const latteBlankSpace = '           ';
    // ' Tea' (length = 4)    '1 x 3.65' (length = 8) = 11
    // 30 - 12 = 18
    const teaBlankSpace = '                  ';

    expect(receipt.printReceipt()).toContain(' Cafe Latte' + latteBlankSpace + '2 x 4.75');
    expect(receipt.printReceipt()).toContain(' Tea' + teaBlankSpace + '1 x 3.65');
  })

  it('prints the correct amount of whitespace for tax', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);
    // Max 30 characters on one line
    // 'Tax:' (4)  +  '$1.14' (5) = 9
    // 30 - 9 = 21
    const taxBlankSpace = '                     '

    expect(receipt.printReceipt()).toContain('Tax:' + taxBlankSpace + '$1.14');
  })

  it('prints the correct amount of whitespace for total', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);
    // Max 30 characters on one line
    // 'Total:' (6)  +  '$13.15' (6) = 12
    // 30 - 12 = 18
    const totalBlankSpace = '                  '

    expect(receipt.printReceipt()).toContain('Total:' + totalBlankSpace + '$13.15');
  })

  it('prints discount info on receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);
    const discount = 'Voucher 10% Off All Muffins!\nValid 01/04/2023 to 31/12/2023\n';

    expect(receipt.printReceipt()).toContain(discount);
  })

  test(('throw error if order is empty'), () => {
    const emptyOrder = {
      getTable: () => 1,
      getItems: () => []
    };
    
    expect(() => {
      new Receipt(emptyOrder);
    }).toThrow('Orders must contain at least one item');
  })

  // This and the below test are workarounds for directly checking if the object
  // is an instance of PriceCalculator as a mock is not a true instance
  test(('throws error if priceCalculator argument is not an object'), () => {
    const mockedOrder = new Order();
    expect(() => {
      new Receipt(mockedOrder, 'string');
    }).toThrow('The second argument should be an instance of PriceCalculator');
  })

  test(('throws error if priceCalculator argument does not contain a function of the PC class'), () => {
    const mockedOrder = new Order();
    expect(() => {
      new Receipt(mockedOrder, new String('string'));
    }).toThrow('The second argument should be an instance of PriceCalculator');
  })

  it('prints cash on the receipt', () => {
    const mockOrder = new Order();
    const mockPriceCalculator = new PriceCalculator();
    const mockPayment = new Payment(20);
    const receipt = new Receipt(mockOrder, mockPriceCalculator, mockPayment);

    expect(receipt.printReceipt()).toContain('Cash:');
    expect(receipt.printReceipt()).toContain('$20.00');
  })
})
