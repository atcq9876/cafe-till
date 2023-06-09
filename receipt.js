const menu = require('./cafeMenu.json');

class Receipt {
  constructor(order, priceCalculator, payment) {
    this.#validateOrder(order);
    this._order = order;
    this.#validatePriceCalculator(priceCalculator);
    this._priceCalculator = priceCalculator;
    this._payment = payment;
  }

  printReceipt() {
    const timestamp = this.getDateAndTime();
    const cafeInfo = 'The Coffee Connection\n\n123 Lakeside Way\nPhone: +1 (650) 360-0708\n\n';
    const discountVoucher = 'Voucher 10% Off All Muffins!\nValid 01/04/2023 to 31/12/2023\n\n';
    const table = `Table: ${this._order.getTable()} / [4]\n`;
    const name = `${this._order.getNames()}\n`;
    const items = this.#formatItems();
    const discount = this.#checkForDiscount();
    const tax = 'Tax:' + `$${this._priceCalculator.calculateTax().toFixed(2)}`.padStart(26) + '\n';
    const totalPrice = 'Total:' + `$${this._priceCalculator.calculateTotalPrice().toFixed(2)}`.padStart(24) + '\n';
    const cash = 'Cash:' + `$${this._payment.getCash().toFixed(2)}`.padStart(25) + '\n';
    const change = 'Change:' + `$${this._payment.calculateChange().toFixed(2)}`.padStart(23) + '\n';
    const receipt = timestamp + cafeInfo + discountVoucher + table + name + items + discount + tax + totalPrice + cash + change;
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

  #checkForDiscount() {
    if (this._priceCalculator.calculateOverallDiscount()) {
      return 'Discount:' + `$${this._priceCalculator.calculateOverallDiscount().toFixed(2)}`.padStart(21) + '\n';
    } else {
      return '';
    }
  }

  #validateOrder(order) {
    if (typeof order !== 'object' || typeof order.getTable !== 'function') {
      throw new Error('The first argument should be an instance of Order');
    } else if (order.getItems().length === 0) {
      throw new Error('Orders must contain at least one item');
    }
  }

  #validatePriceCalculator(priceCalculator) {
    if (typeof priceCalculator !== 'object' || typeof priceCalculator.calculateTax !== 'function') {
      throw new Error('The second argument should be an instance of PriceCalculator');
    }
  }
}

module.exports = Receipt;
