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
})


// expect(() => {
//   bankAccount.depositFunds('03/01/2023', -10.00);
// }).toThrow('Only positive amounts can be deposited');