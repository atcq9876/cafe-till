const Order = require('./order');

describe('Order', () => {
  it('sets table number, names and empty items', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);

    expect(order.table).toEqual(1);
    expect(order.names).toEqual('Andy');
    expect(order.items).toEqual([]);
  })

  it('throws error if table is not a number', () => {
    const table = 'One';
    const names = 'Andy';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('Table must be a number');
  })

  it('throws error if names is not a string', () => {
    const table = 2;
    const names = ['Andy', 'Anna'];
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('Names must be a string');
  })

  it('throws error if names is an empty string', () => {
    const table = 2;
    const names = '';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('Please enter one or more names');
  })
})


// expect(() => {
//   bankAccount.depositFunds('03/01/2023', -10.00);
// }).toThrow('Only positive amounts can be deposited');