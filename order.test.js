const Order = require('./order');

// Mock menu object
const menu = [
  {
    "shopName": "The Coffee Connection",
    "address": "123 Lakeside Way",
    "phone": "16503600708",
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

jest.mock('./cafeMenu.json', () => menu);


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

  it('addItem: throws error if item is not a string', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);

    expect(() => {
      order.addItem(5);
    }).toThrowError('Items must be type string');
  })

  it('addItem: throws error if item is an empty string', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);

    expect(() => {
      order.addItem('');
    }).toThrowError('Please enter an item');
  })

  it('addItem: throws error if item is not on menu', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);

    expect(() => {
      order.addItem('Green Tea');
    }).toThrowError('This is not an item on the menu');
  })

  it('removes an item from the menu', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    order.addItem('Americano');
    order.addItem('Single Espresso');
    order.removeItem('Americano');
    
    expect(order.getItems()).toEqual(['Single Espresso']);
  })

  it('removeItem: throws error if item is not a string', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    order.addItem('Tea');

    expect(() => {
      order.removeItem(5);
    }).toThrowError('Items must be type string');
  })

  it('removeItem: throws error if item is an empty string', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    order.addItem('Tea');

    expect(() => {
      order.removeItem('');
    }).toThrowError('Please enter an item');
  })

  it('removeItem: throws error if item is not on menu', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    order.addItem('Tea');

    expect(() => {
      order.removeItem('Green Tea');
    }).toThrowError('This is not an item on the menu');
  })

  it('removeItem: throws error if item has not been added yet', () => {
    const table = 1;
    const names = 'Andy';
    const order = new Order(table, names);
    order.addItem('Tea');

    expect(() => {
      order.removeItem('Americano');
    }).toThrowError("Can't remove an item that hasn't been added yet");
  })
})
