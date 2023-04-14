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
    console.log('New order opened');
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
        console.log('Table number successfully added')
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
        console.log('Customer name(s) successfully added')
        this._order = new Order(this._tableNumber, this._customerNames);
        this.takeOrder();
      } catch (err) {
        console.error(`Error: ${err.message}`);
        this.getCustomerNames();
      }
    })
  }

  takeOrder() {

  }
}

module.exports = CLI;

const cli = new CLI();
cli.start();
