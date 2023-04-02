class Order {
  constructor(table, names) {
    if (typeof table !== 'number') throw new Error('Table must be a number');
    this.table = table;
    this.names = names;
    this.items = [];
  }
}

module.exports = Order;
