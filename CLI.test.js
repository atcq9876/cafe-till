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
      const consoleSpy = jest.spyOn(console, 'log');
      jest.spyOn(cli, 'getTableNumber');

      cli.start();

      expect(consoleSpy).toHaveBeenCalledWith('New order opened\n');
      expect(cli.getTableNumber).toHaveBeenCalled();
    })
  })

  describe('getTableNumber', () => {
    it('should set the table number if input is valid', () => {
      const validInput = '3';
      const expectedTableNumber = parseInt(validInput);
  
      const consoleSpy = jest.spyOn(console, 'log');
      jest.spyOn(cli, 'getCustomerNames');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${validInput}\n`);
  
      expect(consoleSpy).toHaveBeenCalledWith('Table number successfully added\n')
      expect(cli._tableNumber).toEqual(expectedTableNumber);
      expect(cli.getCustomerNames).toHaveBeenCalled();
    })
  
    it('should prompt for input again if input is not a number', () => {
      const invalidInput = 'blah';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error').mockImplementation(() => {});
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalled();
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is not between 1 and 4', () => {
      const invalidInput = '5';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error').mockImplementation(() => {});
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalled();
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is an empty string', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error').mockImplementation(() => {});
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalled();
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  })

  describe('getCustomerNames', () => {
    it('should set the customer name(s) if input is valid', () => {
      cli._tableNumber = 1;
      const validInput = 'Andy, Anna';
      const consoleSpy = jest.spyOn(console, 'log');
      jest.spyOn(cli, 'takeOrder');
  
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${validInput}\n`);
  
      expect(consoleSpy).toHaveBeenCalledWith('Customer name(s) successfully added\n')
      expect(cli._customerNames).toEqual('Andy, Anna');
      expect(cli._order.getTable()).toEqual(1);
      expect(cli._order.getNames()).toEqual('Andy, Anna');
      expect(cli.takeOrder).toHaveBeenCalled();
    })
  
    it('should prompt for input again if input is an empty string', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getCustomerNames');
      jest.spyOn(console, 'error').mockImplementation(() => {});
  
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalled();
      expect(cli.getCustomerNames).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is null', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getCustomerNames');
      jest.spyOn(console, 'error').mockImplementation(() => {});
  
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalled();
      expect(cli.getCustomerNames).toHaveBeenCalledTimes(2);
      expect(cli._order).toEqual(null);
    })
  })

  describe('takeOrder', () => {
    it('should prompt for input again if it is not one of the options', () => {
      const invalidInput = 6;
      jest.spyOn(cli, 'takeOrder');
      jest.spyOn(console, 'error').mockImplementation(() => {});

      cli.takeOrder();
      cli._rl.input.emit('data', `${invalidInput}\n`)

      expect(console.error).toHaveBeenCalled();
      expect(cli.takeOrder).toHaveBeenCalledTimes(2);
    })

    it('can add an item to the order', () => {
      cli._order = new Order(1, 'Andy');
      jest.spyOn(cli, 'takeOrder');

      cli.takeOrder();
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'Tea\n');

      expect(cli._order.getItems()).toEqual(['Tea']);
      expect(cli.takeOrder).toHaveBeenCalledTimes(2);
    })

    it('prompts for input again if input is not on the menu', () => {
      cli._order = new Order(1, 'Andy');
      jest.spyOn(cli, 'addItem');

      cli.takeOrder();
      cli._rl.input.emit('data', '1\n');
      cli._rl.input.emit('data', 'test\n');

      expect(cli._order.getItems()).toEqual([]);
      expect(cli.addItem).toHaveBeenCalledTimes(2);
    })
  })
})
