const Order = require('./order');

class Receipt {
  constructor(order) {
    this.#validateOrder(order);
    this.order = order;
  }

  #validateOrder(order) {
    if (typeof order !== 'object') throw new Error('Only objects can be passed to Receipt');
    if (typeof order.getTable !== 'function') throw new Error('Only instances of Order can be passed to Receipt');
  }
}

module.exports = Receipt;
