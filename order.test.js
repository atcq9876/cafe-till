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

  it('can setTable', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    order.setTable(4);

    expect(order.getTable()).toEqual(4);
  })

  it('constructor: throws error if table is not a number', () => {
    const table = 'One';
    const names = 'Andy';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('Table must be a number');
  })

  it('constructor: throws error if table is below valid range (only four tables in cafe)', () => {
    const table = 0;
    const names = 'Andy';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('There are only four tables in the cafe');
  })

  it('constructor: throws error if table is above valid range (only four tables in cafe)', () => {
    const table = 5;
    const names = 'Andy';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('There are only four tables in the cafe');
  })

  it('setTable: throws error if table is not a number', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    
    expect(() => {
      order.setTable('Two');
    }).toThrow('Table must be a number');
  })

  it('setTable: throws error if table is below valid range (only four tables in cafe)', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    
    expect(() => {
      order.setTable(0);
    }).toThrow('There are only four tables in the cafe');
  })

  it('setTable: throws error if table is above valid range (only four tables in cafe)', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    
    expect(() => {
      order.setTable(5);
    }).toThrow('There are only four tables in the cafe');
  })

  it('constructor: throws error if names is not a string', () => {
    const table = 2;
    const names = ['Andy', 'Anna'];
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('Names must be a string');
  })

  it('constructor: throws error if names is an empty string', () => {
    const table = 2;
    const names = '';
    
    expect(() => {
      const order = new Order(table, names);
    }).toThrow('Please enter one or more names');
  })

  it('setNames: throws error if names is an empty string', () => {
    const table = 2;
    const names = 'Andy';
    const order = new Order(table, names);
    
    expect(() => {
      order.setNames(['James']);
    }).toThrow('Names must be a string');
  })

  it('setNames: throws error if names is an empty string', () => {
    const table = 2;
    const names = 'Andy';
    const order = new Order(table, names);
    
    expect(() => {
      order.setNames('');
    }).toThrow('Please enter one or more names');
  })

  it('adds an item to order if item is on the menu', () => {
    const order = new Order(3, 'Andy, Anna');
    order.addItem('Cafe Latte');

    expect(order.getItems()).toEqual(['Cafe Latte']);
  })

  it('throws error if item is not a string', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);

    expect(() => {
      order.addItem(5);
    }).toThrowError('Items must be type string');
  })

  it('throws error if item is an empty string', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);

    expect(() => {
      order.addItem('');
    }).toThrowError('Please enter an item');
  })

  it('throws error if item is not on menu', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);

    expect(() => {
      order.addItem('Green Tea');
    }).toThrowError('This is not an item on the menu');
  })
})
