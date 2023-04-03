const Order = require('./order');
const menu = require('./cafeMenu.json');

class Receipt {
  constructor(order) {
    this.#validateOrder(order);
    this._order = order;
  }

  printReceipt() {
    let cafeInfo = 'The Coffee Connection\n\n123 Lakeside Way\nPhone: +1 (650) 360-0708\n';
    let table = `Table: ${this._order.getTable()} / [4]\n`;
    let name = `${this._order.getNames()}\n`;
    let orderedItems = this._order.getItems();
    
    let itemsAndQuantities = orderedItems.reduce((array, item, index) => {
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
      formattedItems += `  ${itemsAndQuantities[i]}     ${itemsAndQuantities[i + 1]} x ${menu[0].prices[0][itemsAndQuantities[i]]}\n`;
    }

    let receipt = this.getDateAndTime() + cafeInfo + table + name + formattedItems;
    console.log(receipt);
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

  #validateOrder(order) {
    if (typeof order !== 'object') throw new Error('Only objects can be passed to Receipt');
    if (typeof order.getTable !== 'function') throw new Error('Only instances of Order can be passed to Receipt');
  }
}

module.exports = Receipt;
