const CLI = require('./CLI');
const Order = require('./order');

describe('CLI', () => {
  let cli;

  beforeEach(() => {
    cli = new CLI();
  })

  afterEach(() => {
    cli._rl.close();
  })

  describe('start', () => {
    it('should call getTableNumber', () => {
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'log');

      cli.start();

      expect(console.log).toHaveBeenCalledWith('New order opened\n');
      expect(cli.getTableNumber).toHaveBeenCalledTimes(1);
    })
  })

  describe('getTableNumber', () => {
    it('should set the table number if input is valid', () => {
      const validInput = '3';
      const expectedTableNumber = parseInt(validInput);
      jest.spyOn(cli, 'getCustomerNames');
      jest.spyOn(console, 'log');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${validInput}\n`);
  
      expect(console.log).toHaveBeenCalledWith('Table number successfully added\n')
      expect(cli._tableNumber).toEqual(expectedTableNumber);
      expect(cli.getCustomerNames).toHaveBeenCalledTimes(1);
    })
  
    it('should prompt for input again if input is not a number', () => {
      const invalidInput = 'blah';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('Error: Table must be a number between 1 and 4\n');
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is not between 1 and 4', () => {
      const invalidInput = '5';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('Error: Table must be a number between 1 and 4\n');
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is an empty string', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('Error: Table must be a number between 1 and 4\n');
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  })

  describe('getCustomerNames', () => {
    it('should set the customer name(s) if input is valid', () => {
      cli._tableNumber = 1;
      const validInput = 'Andy, Anna';
      jest.spyOn(cli, 'takeOrder');
      jest.spyOn(console, 'log');
  
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${validInput}\n`);
  
      expect(console.log).toHaveBeenCalledWith('Customer name(s) successfully added\n')
      expect(cli._customerNames).toEqual('Andy, Anna');
      expect(cli._order.getTable()).toEqual(1);
      expect(cli._order.getNames()).toEqual('Andy, Anna');
      expect(cli.takeOrder).toHaveBeenCalledTimes(1);
    })
  
    it('should prompt for input again if input is an empty string', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getCustomerNames');
      jest.spyOn(console, 'error');
  
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('Error: Please enter one or more names\n');
      expect(cli.getCustomerNames).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is null', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getCustomerNames');
      jest.spyOn(console, 'error');
  
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('Error: Please enter one or more names\n');
      expect(cli.getCustomerNames).toHaveBeenCalledTimes(2);
      expect(cli._order).toEqual(null);
    })
  })

  describe('takeOrder', () => {
    it('should prompt for input again if it is not one of the options', () => {
      const invalidInput = 6;
      jest.spyOn(cli, 'takeOrder');
      jest.spyOn(console, 'error');

      cli.takeOrder();
      cli._rl.input.emit('data', `${invalidInput}\n`)
      
      expect(console.error).toHaveBeenCalledWith('Error: Please enter 1, 2, 3, 4 or 9\n');
      expect(cli.takeOrder).toHaveBeenCalledTimes(2);
    })

    it('can add an item to the order', () => {
      cli._order = new Order(1, 'Andy');
      jest.spyOn(cli, 'takeOrder');
      jest.spyOn(cli, 'addItem');
      jest.spyOn(console, 'log');

      cli.takeOrder();
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'Tea\n');

      expect(console.log).toHaveBeenCalledWith('Item successfully added\n')
      expect(cli._order.getItems()).toEqual(['Tea']);
      expect(cli.takeOrder).toHaveBeenCalledTimes(2);
      expect(cli.addItem).toHaveBeenCalledTimes(1);
    })

    it('prompts for input again if input is not on the menu', () => {
      cli._order = new Order(1, 'Andy');
      jest.spyOn(cli, 'addItem');
      jest.spyOn(console, 'error');

      cli.takeOrder();
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'test\n');

      expect(cli._order.getItems()).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Error: This is not an item on the menu');
      expect(cli.addItem).toHaveBeenCalledTimes(2);
    })

    it('can remove an item from the order', () => {
      cli._order = new Order(1, 'Andy');
      jest.spyOn(cli, 'takeOrder');
      jest.spyOn(cli, 'removeItem');

      cli.takeOrder();
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'Tea\n');
      cli._rl.input.emit('data', '2\n');
      cli._rl.input.emit('data', 'Tea\n');

      expect(console.log).toHaveBeenCalledWith('Item successfully removed\n')
      expect(cli._order.getItems()).toEqual([]);
      expect(cli.takeOrder).toHaveBeenCalledTimes(3);
      expect(cli.removeItem).toHaveBeenCalledTimes(1);
    })

    it('prompts for input again if input is not on the menu', () => {
      cli._order = new Order(1, 'Andy');
      jest.spyOn(cli, 'removeItem');
      jest.spyOn(console, 'error');

      cli.takeOrder();
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'Tea\n');
      cli._rl.input.emit('data', '2\n');
      cli._rl.input.emit('data', 'testtt\n');

      expect(cli._order.getItems()).toEqual(['Tea']);
      expect(console.error).toHaveBeenCalledWith('Error: This is not an item on the menu');
      expect(cli.removeItem).toHaveBeenCalledTimes(2);
    })

    it('can display the items of the current order', () => {
      cli._order = new Order(1, 'Andy');
      jest.spyOn(cli, 'takeOrder');
      jest.spyOn(cli, 'viewItems');
      jest.spyOn(console, 'log');

      cli.takeOrder();
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'Tea\n');
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'Tea\n');
      cli._rl.input.emit('data', '3\n');

      expect(console.log).toHaveBeenCalledWith('Items added so far:');
      expect(console.log).toHaveBeenCalledWith('Tea, Tea\n');
      expect(cli.takeOrder).toHaveBeenCalledTimes(4);
      expect(cli.viewItems).toHaveBeenCalledTimes(1);
    })

    it('can complete an order', () => {
      cli._order = new Order(1, 'Andy');
      jest.spyOn(cli, 'takeOrder');
      jest.spyOn(cli, 'finaliseItems');
      jest.spyOn(console, 'log');

      cli.takeOrder();
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'Tea\n');
      cli._rl.input.emit('data', '4\n');

      expect(cli.takeOrder).toHaveBeenCalledTimes(2);
      expect(cli.finaliseItems).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('Items finalised\n');
    })
  })
})
