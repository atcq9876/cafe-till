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

      cli.start();

      expect(cli.getTableNumber).toHaveBeenCalled();
    })
  })

  describe('getTableNumber', () => {
    it('should set the table number if input is valid', () => {
      const validInput = '3';
      const expectedTableNumber = parseInt(validInput);
  
      jest.spyOn(cli, 'getCustomerNames');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${validInput}\n`);
  
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
  })
})
