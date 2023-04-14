const readline = require('readline');
const Order = require('./order');


class CLI {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.tableNumber = null;
    this.customerNames = null;
    this.order = null;
  }

  start() {
    console.log('New order opened');
    this.getTableNumber()
  }

  getTableNumber() {
  }
}

module.exports = CLI;

const cli = new CLI();
cli.start();
