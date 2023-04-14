const CLI = require('./CLI');

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

      expect(consoleSpy).toHaveBeenCalledWith('New order opened');
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
  
      expect(consoleSpy).toHaveBeenCalledWith('Table number successfully added')
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
  
      expect(consoleSpy).toHaveBeenCalledWith('Customer name(s) successfully added')
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
    it('provides a list of options - add, remove, view, complete order', () => {
      const consoleSpy = jest.spyOn(console, 'log');

      cli.takeOrder();

      const expectedMessage = 'Press one of the following keys to update the order:\n'
        + '1 - Add an item\n'
        + '2 - Remove an item\n'
        + '3 - View the order\n'
        + '4 - Complete the order\n'
        + 'X - Cancel the order\n'

      expect(consoleSpy).toHaveBeenCalledWith(expectedMessage);
    })
  })
})
