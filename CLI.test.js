const CLI = require('./CLI');
const Order = require('./order');
const readline = require('readline');

describe('CLI', () => {
  let cli;

  beforeEach(() => {
    cli = new CLI();
  })

  afterEach(() => {
    cli.rl.close();
  })

  describe('start', () => {
    it('should call getTableNumber', () => {
      jest.spyOn(cli, 'getTableNumber');

      cli.start();

      expect(cli.getTableNumber).toHaveBeenCalled();
    })
  })
})
