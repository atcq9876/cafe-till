class Order {
  constructor(table, names) {
    this.#validateTableNumber(table);
    this.#validateNames(names);
    this._table = table;
    this._names = names;
    this._items = [];
  }

  getNames() {
    return this._names;
  }

  setNames(names) {
    this.#validateNames(names);
    this._names = names;
  }

  getTable() {
    return this._table;
  }

  setTable(table) {
    this.#validateTableNumber(table);
    this._table = table;
  }

  addItem(item) {
    if (typeof item !== 'string') throw new Error('Items must be type string');
    if (item === '') throw new Error('Please enter an item');
    this._items.push(item);
  }

  getItems() {
    return this._items;
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
