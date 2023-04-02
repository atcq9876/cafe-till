class Order {
  constructor(table, names) {
    if (typeof table !== 'number') throw new Error('Table must be a number');
    if (typeof names !== 'string') throw new Error('Names must be a string');
    if (names === '') throw new Error('Please enter one or more names');
    this.table = table;
    this.names = names;
    this.items = [];
  }
}

module.exports = Order;
