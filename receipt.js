const Order = require('./order');

class Receipt {
  constructor(order, dateAndTime) {
    this.#validateOrder(order);
    this._order = order;
    this._dateAndTime = dateAndTime;
  }

  printReceipt() {
    let cafeInfo = 'The Coffee Connection\n\n123 Lakeside Way\nPhone: +1 (650) 360-0708\n';
    let table = `Table: ${this._order.getTable()} / [4]\n`;
    let name = `${this._order.getNames()}\n`;
    let receipt = this._dateAndTime + cafeInfo + table + name;
    return receipt;
  }

  #validateOrder(order) {
    if (typeof order !== 'object') throw new Error('Only objects can be passed to Receipt');
    if (typeof order.getTable !== 'function') throw new Error('Only instances of Order can be passed to Receipt');
  }
}

module.exports = Receipt;
