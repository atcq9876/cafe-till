const Order = require('./order');

describe('Order', () => {
  it('sets table number, names and empty items', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);

    expect(order.getTable()).toEqual(1);
    expect(order.getNames()).toEqual('Andy');
    expect(order.getItems()).toEqual([]);
  })

  it('can setNames', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    order.setNames('Belle, Chris');

    expect(order.getNames()).toEqual('Belle, Chris');
  })

  it('throws error if table is not a number', () => {
    const table = 'One';
    const names = 'Andy';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('Table must be a number');
  })

  it('throws error if table is not in valid range (only four tables in cafe)', () => {
    const table = 0;
    const names = 'Andy';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('There are only four tables in the cafe');
  })

  it('throws error if table is not in valid range (only four tables in cafe)', () => {
    const table = 5;
    const names = 'Andy';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('There are only four tables in the cafe');
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

  it('adds an item to order', () => {
    const order = new Order(3, 'Andy, Anna');
    order.addItem('Cafe Latte');

    expect(order.getItems()).toEqual(['Cafe Latte']);
  })
})


// expect(() => {
//   bankAccount.depositFunds('03/01/2023', -10.00);
// }).toThrow('Only positive amounts can be deposited');