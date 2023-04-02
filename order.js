class Order {
  constructor(table, names) {
    this.#validateTableNumber(table);
    this.#validateNames(names);
    this.table = table;
    this.names = names;
    this.items = [];
  }

  #validateTableNumber(table) {
    if (typeof table !== 'number') throw new Error('Table must be a number');
    if (table < 1 || table > 4) throw new Error('There are only four tables in the cafe');
  }

  #validateNames(names) {
    if (typeof names !== 'string') throw new Error('Names must be a string');
    if (names === '') throw new Error('Please enter one or more names');
  }
}

module.exports = Order;
