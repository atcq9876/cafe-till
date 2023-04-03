const Receipt = require('./receipt');
const Order = require('./order');

jest.mock('./order', () => {
  return jest.fn().mockImplementation(() => {
    return {
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getItems: jest.fn().mockReturnValue(['Cafe Latte', 'Cafe Latte', 'Tea']),
      setTable: jest.fn(),
      setNames: jest.fn(),
      getTable: jest.fn().mockReturnValue(2),
      getNames: jest.fn().mockReturnValue('Andy', 'Anna'),
    };
  });
});

describe('Receipt', () => { 
  it('initialises correctly if passed an Order object', () => {
    const mockOrder = new Order();
    const receipt = new Receipt(mockOrder);

    expect(receipt.order).toEqual(mockOrder);
    expect(receipt.order.getTable()).toEqual(2);
    expect(receipt.order.getNames()).toEqual('Andy', 'Anna');
    expect(receipt.order.getItems()).toEqual(['Cafe Latte', 'Cafe Latte', 'Tea']);
  })

  test(('throws error if argument is not an order'), () => {
    expect(() => {
      new Receipt('string');
    }).toThrow('Only objects can be passed to Receipt');
  })
})
