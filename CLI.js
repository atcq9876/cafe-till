const readline = require('readline');
const Order = require('./order');


class CLI {
  constructor() {
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this._tableNumber = null;
    this._customerNames = null;
    this._order = null;
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
          throw new Error('Table must be a number between 1 and 4');
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
      + '4 - Complete the order\n'
      + '9 - Cancel the order\n'
    const validOptions = ['1', '2', '3', '4', '9'];
    this._rl.question(optionsMessage, (input) => {
      try {
        if (!validOptions.includes(input)) throw new Error('Please enter 1, 2, 3, 4 or 9');
      } catch (err) {
        this.takeOrder();
      }
    }) 
  }
}

module.exports = CLI;

const cli = new CLI();
cli.start();
