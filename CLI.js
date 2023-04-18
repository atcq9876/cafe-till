const readline = require('readline');
const Order = require('./order');
const ItemDiscount = require('./itemDiscount');


class CLI {
  constructor() {
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this._tableNumber = null;
    this._customerNames = null;
    this._order = null;
    this._discountedItemName = null;
    this._itemDiscountPercent = null;
    this._itemDiscount = null;
  }

  start() {
    console.log('New order opened\n');
    this.getTableNumber()
  }

  getTableNumber() {
    this._rl.question('Please enter the table number: ', (tableNumber) => {
      try {
        const parsedTableNumber = parseInt(tableNumber);
        if (isNaN(parsedTableNumber) || parsedTableNumber < 1 || parsedTableNumber > 4) {
          throw new Error('Table must be a number between 1 and 4\n');
        }
        this._tableNumber = parseInt(tableNumber);
        console.log('Table number successfully added\n')
        this.getCustomerNames();
      } catch (err) {
        console.error(`Error: ${err.message}`);
        this.getTableNumber();
      }
    })
  }

  getCustomerNames() {
    this._rl.question('Please enter the customer name(s): ', (names) => {
      try {
        if (!names) throw new Error('Please enter one or more names\n');
        this._customerNames = names;
        console.log('Customer name(s) successfully added\n')
        this._order = new Order(this._tableNumber, this._customerNames);
        this.takeOrder();
      } catch (err) {
        console.error(`Error: ${err.message}`);
        this.getCustomerNames();
      }
    })
  }

  takeOrder() {
    const optionsMessage = 'Press one of the following keys to update the order:\n'
      + '1 - Add an item\n'
      + '2 - Remove an item\n'
      + '3 - View the order\n'
      + '4 - Finalise items\n'
      + '9 - Cancel the order\n'
    const validOptions = ['1', '2', '3', '4', '9'];
    this._rl.question(optionsMessage, (input) => {
      try {
        if (!validOptions.includes(input)) throw new Error('Please enter 1, 2, 3, 4 or 9\n');
        if (input === '1') {
          this.addItem();
        } else if (input === '2') {
          this.removeItem();
        } else if (input === '3') {
          this.viewItems();
        } else if (input === '4') {
          this.finaliseItems();
        } else if (input == '9') {
          this.cancelOrder();
        }
      } catch (err) {
        console.error(`Error: ${err.message}`);
        this.takeOrder();
      }
    }) 
  }

  addItem() {
    this._rl.question('Which item would you like to add? ', (item) => {
      try {
        this._order.addItem(item);
        console.log('Item successfully added\n');
        this.takeOrder();
      } catch (err) {
        console.error(`Error: ${err.message}`);
        this.addItem();
      }
    })
  }

  removeItem() {
    this._rl.question('Which item would you like to remove? ', (item) => {
      try {
        this._order.removeItem(item);
        console.log('Item successfully removed\n');
        this.takeOrder();
      } catch (err) {
        console.error(`Error: ${err.message}`);
        this.removeItem();
      }
    })
  }

  viewItems() {
    console.log('Items added so far:')
    console.log(this._order.getItems().join(', ') + '\n');
    this.takeOrder();
  }

  finaliseItems() {
    console.log('Items finalised\n');
    this.checkForItemDiscount();
  }

  cancelOrder() {
    this._rl.question('Are you sure want to cancel the order? Yes/No: ', (response) => {
      try {
        if (response !== 'Yes' && response !== 'No') {
          throw new Error("Please response 'Yes' or 'No'");
        } else if (response === 'Yes') {
          console.log('Order cancelled\n');
          this._rl.close();
        } else if (response === 'No') {
          this.takeOrder();
        }
      } catch (err) {
        console.error(`Error: ${err.message}`);
        this.cancelOrder();
      }
    })
  }

  checkForItemDiscount() {
    this._rl.question('Does the customer have an item discount voucher? Yes/No: ', (response) => {
      if (response === 'Yes') {
        this.getItemDiscountName();
      }
    })
  }

  getItemDiscountName() {
    this._rl.question('Item name: ', (item) => {
      try {
        this._discountedItemName = item;
        this.getItemDiscountPercent();
      } catch (err) {
      }
    })
  }

  getItemDiscountPercent() {
    this._rl.question('Discount percent: ', (percent) => {
      try {
        this._itemDiscountPercent = parseInt(percent);
        this.createItemDiscountObject();
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    })
  }

  createItemDiscountObject() {
    this._itemDiscount = new ItemDiscount(this._discountedItemName, this._itemDiscountPercent);
    console.log(`Item discount added: ${this._itemDiscountPercent}% off ${this._discountedItemName}`);
  }
}

module.exports = CLI;

const cli = new CLI();
cli.start();
