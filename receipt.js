const menu = require('./cafeMenu.json');

class Receipt {
  constructor(order, priceCalculator) {
    this.#validateOrder(order);
    this._order = order;
    this._priceCalculator = priceCalculator;
  }

  printReceipt() {
    const receipt = this.#formatReceipt();
    return receipt;
  }

  #formatReceipt() {
    const cafeInfo = 'The Coffee Connection\n\n123 Lakeside Way\nPhone: +1 (650) 360-0708\n\n';
    const discount = 'Voucher 10% Off All Muffins!\nValid 01/05/2023 to 31/05/2023\n';
    const table = `Table: ${this._order.getTable()} / [4]\n`;
    const name = `${this._order.getNames()}\n`;
    const items = this.#formatItems();
    const tax = 'Tax:' + `$${this._priceCalculator.calculateTax()}`.padStart(26) + '\n';
    const totalPrice = 'Total:' + `$${this._priceCalculator.calculateTotalPrice()}`.padStart(24) + '\n';
    const receipt = this.getDateAndTime() + cafeInfo + discount + table + name + items + tax + totalPrice;
    return receipt;
  }

  getDateAndTime() {
    return new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace(/\..+/, '')
      .replace(/-/g, '.')
      + '\n';
  }

  #formatItems() {
    const items = this._order.getItems();
    const itemsAndQuantities = items.reduce((array, item, index) => {
      if (index === 0) {
        array.push(item);
        array.push(1);
        return array;
      }
      else if (!array.includes(item)) {
        array.push(item);
        array.push(1);
        return array;
      } else {
        array[array.indexOf(item) + 1] ++;
        return array;
      }
    }, []);

    let formattedItems = '';
    for (let i = 0; i < itemsAndQuantities.length; i += 2) {
      formattedItems += ` ${itemsAndQuantities[i]}`.padEnd(18);
      formattedItems += `${itemsAndQuantities[i + 1]} x ${menu[0].prices[0][itemsAndQuantities[i]].toFixed(2)}`.padStart(12);
      formattedItems += '\n';
    }

    return formattedItems + '\n';
  }

  #validateOrder(order) {
    if (typeof order !== 'object') throw new Error('Only objects can be passed to Receipt');
    if (typeof order.getTable !== 'function') throw new Error('Only instances of Order can be passed to Receipt');
    if (order.getItems().length === 0) throw new Error('Orders must contain at least one item');
  }
}

module.exports = Receipt;
