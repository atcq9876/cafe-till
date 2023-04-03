const Order = require('./order');

class Receipt {
  constructor(order) {
    this.#validateOrder(order);
    this.order = order;
  }

  printReceipt() {
    let cafeInfo = 'The Coffee Connection\n\n123 Lakeside Way\nPhone: +1 (650) 360-0708\n';
    let table = `Table: ${this.order.getTable()} / [4]\n`;
    let name = `${this.order.getNames()}\n`;
    let receipt = cafeInfo + table + name;
    return receipt;
  }

  #validateOrder(order) {
    if (typeof order !== 'object') throw new Error('Only objects can be passed to Receipt');
    if (typeof order.getTable !== 'function') throw new Error('Only instances of Order can be passed to Receipt');
  }
}

module.exports = Receipt;
