const Order = require('./order');

describe('Order', () => {
  it('sets table number, names and empty items', () => {
    const table = 1;
    const names = "Andy";
    const order = new Order(table, names);

    expect(order.table).toEqual(1);
    expect(order.names).toEqual("Andy");
    expect(order.items).toEqual([]);
  })
})
