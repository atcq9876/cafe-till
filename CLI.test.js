const CLI = require('./CLI');
const Order = require('./order');
const ItemDiscount = require('./itemDiscount');
const TotalPriceDiscount = require('./totalPriceDiscount');

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

      expect(console.log).toHaveBeenCalledWith('New order opened');
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
  
      expect(console.log).toHaveBeenCalledWith('\nTable number successfully added')
      expect(cli._tableNumber).toEqual(expectedTableNumber);
      expect(cli.getCustomerNames).toHaveBeenCalledTimes(1);
    })
  
    it('should prompt for input again if input is not a number', () => {
      const invalidInput = 'blah';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('\nError: Table must be a number between 1 and 4');
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is not between 1 and 4', () => {
      const invalidInput = '5';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('\nError: Table must be a number between 1 and 4');
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is an empty string', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getTableNumber');
      jest.spyOn(console, 'error');
  
      cli.getTableNumber();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('\nError: Table must be a number between 1 and 4');
      expect(cli.getTableNumber).toHaveBeenCalledTimes(2);
    })
  })

  describe('getCustomerNames', () => {
    it('should set the customer name(s) if input is valid', () => {
      cli._tableNumber = 1;
      const validInput = 'Andy, Anna';
      jest.spyOn(console, 'log');
      
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${validInput}\n`);
      
      expect(console.log).toHaveBeenCalledWith('\nCustomer name(s) successfully added')
      expect(cli._customerNames).toEqual('Andy, Anna');
    })

    it('should prompt for input again if input is an empty string', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getCustomerNames');
      jest.spyOn(console, 'error');
  
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('\nError: Please enter one or more names');
      expect(cli.getCustomerNames).toHaveBeenCalledTimes(2);
    })
  
    it('should prompt for input again if input is null', () => {
      const invalidInput = '';
      jest.spyOn(cli, 'getCustomerNames');
      jest.spyOn(console, 'error');
  
      cli.getCustomerNames();
      cli._rl.input.emit('data', `${invalidInput}\n`);

      expect(console.error).toHaveBeenCalledWith('\nError: Please enter one or more names');
      expect(cli.getCustomerNames).toHaveBeenCalledTimes(2);
      expect(cli._order).toEqual(null);
    })
  })

  describe('createOrderObject', () => {
    it('creates an Order object', () => {
      cli._customerNames = 'Andy, Anna';
      cli._tableNumber = 1;
      jest.spyOn(cli, 'takeOrder');
      
      cli.createOrderObject();

      expect(cli._order.getTable()).toEqual(1);
      expect(cli._order.getNames()).toEqual('Andy, Anna');
      expect(cli.takeOrder).toHaveBeenCalledTimes(1);
    })

    it('closes the app if there is an error creating an order (e.g. if table and names not set)', () => {
      jest.spyOn(cli, 'takeOrder');

      cli.createOrderObject();

      expect(cli._order).toEqual(null);
      expect(cli.takeOrder).toHaveBeenCalledTimes(0);
    })
  })

  describe('takeOrder', () => {
    it('should prompt for input again if it is not one of the options', () => {
      const invalidInput = 6;
      jest.spyOn(cli, 'takeOrder');
      jest.spyOn(console, 'error');

      cli.takeOrder();
      cli._rl.input.emit('data', `${invalidInput}\n`)
      
      expect(console.error).toHaveBeenCalledWith('\nError: Please enter 1, 2, 3, 4 or 9');
      expect(cli.takeOrder).toHaveBeenCalledTimes(2);
    })

    describe('addItem', () => {
      it('can add an item to the order', () => {
        cli._order = new Order(1, 'Andy');
        jest.spyOn(cli, 'takeOrder');
        jest.spyOn(cli, 'addItem');
        jest.spyOn(console, 'log');
  
        cli.takeOrder();
        cli._rl.input.emit('data', '1\n');
        cli._rl.input.emit('data', 'Tea\n');
  
        expect(console.log).toHaveBeenCalledWith('\nItem successfully added')
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
        expect(console.error).toHaveBeenCalledWith('\nError: This is not an item on the menu');
        expect(cli.addItem).toHaveBeenCalledTimes(2);
      })
    })

    describe('removeItem', () => {
      it('can remove an item from the order', () => {
        cli._order = new Order(1, 'Andy');
        cli._order._items = ['Tea']
        jest.spyOn(cli, 'takeOrder');
        jest.spyOn(cli, 'removeItem');
  
        cli.takeOrder();
        cli._rl.input.emit('data', '2\n');
        cli._rl.input.emit('data', 'Tea\n');
  
        expect(console.log).toHaveBeenCalledWith('\nItem successfully removed')
        expect(cli._order.getItems()).toEqual([]);
        expect(cli.takeOrder).toHaveBeenCalledTimes(2);
        expect(cli.removeItem).toHaveBeenCalledTimes(1);
      })
  
      it('prompts for input again if input is not on the menu', () => {
        cli._order = new Order(1, 'Andy');
        jest.spyOn(cli, 'removeItem');
        jest.spyOn(console, 'error');
  
        cli.takeOrder();
        cli._rl.input.emit('data', '2\n');
        cli._rl.input.emit('data', 'testtt\n');
  
        expect(cli._order.getItems()).toEqual([]);
        expect(console.error).toHaveBeenCalledWith('\nError: This is not an item on the menu');
        expect(cli.removeItem).toHaveBeenCalledTimes(2);
      })

      it('throws error if trying to remove an item that hasnt been added to order yet', () => {
        cli._order = new Order(1, 'Andy');
        jest.spyOn(cli, 'removeItem');
        jest.spyOn(console, 'error');
  
        cli.takeOrder();
        cli._rl.input.emit('data', '2\n');
        cli._rl.input.emit('data', 'Cafe Latte\n');
  
        expect(cli._order.getItems()).toEqual([]);
        expect(console.error).toHaveBeenCalledWith("\nError: Can't remove an item that hasn't been added yet");
        expect(cli.removeItem).toHaveBeenCalledTimes(2);
      })

      it('throws error if trying to remove an item that hasnt been added to order yet', () => {
        cli._order = new Order(1, 'Andy');
        jest.spyOn(cli, 'removeItem');
        jest.spyOn(console, 'error');
  
        cli.takeOrder();
        cli._rl.input.emit('data', '2\n');
        cli._rl.input.emit('data', 'Cafe Latte\n');
  
        expect(cli._order.getItems()).toEqual([]);
        expect(console.error).toHaveBeenCalledWith("\nError: Can't remove an item that hasn't been added yet");
        expect(cli.removeItem).toHaveBeenCalledTimes(2);
      })
    })

    describe('viewItems', () => {
      it('can display the items of the current order', () => {
        cli._order = new Order(1, 'Andy');
        cli._order._items = ['Tea', 'Tea'];
        jest.spyOn(cli, 'takeOrder');
        jest.spyOn(cli, 'viewItems');
        jest.spyOn(console, 'log');
  
        cli.takeOrder();
        cli._rl.input.emit('data', '3\n');
  
        expect(console.log).toHaveBeenCalledWith('\nItems added so far:');
        expect(console.log).toHaveBeenCalledWith('\nTea, Tea');
        expect(cli.takeOrder).toHaveBeenCalledTimes(2);
        expect(cli.viewItems).toHaveBeenCalledTimes(1);
      })

      it('prints that order is empty if no items added', () => {
        cli._order = new Order(1, 'Andy');
        jest.spyOn(cli, 'takeOrder');
        jest.spyOn(console, 'error');
  
        cli.viewItems();
  
        expect(console.error).toHaveBeenCalledWith('\nNo items have been added to the order yet');
        expect(cli.takeOrder).toHaveBeenCalledTimes(1);
      })
    })

    describe('finaliseItems', () => {
      it('can mark the items as finalised', () => {
        cli._order = new Order(1, 'Andy');
        cli._order._items = ['Tea'];
        jest.spyOn(cli, 'finaliseItems');
        jest.spyOn(cli, 'checkForItemDiscount');
        jest.spyOn(console, 'log');
  
        cli.takeOrder();
        cli._rl.input.emit('data', '4\n');
  
        expect(cli.finaliseItems).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('\nItems finalised');
        expect(cli.checkForItemDiscount).toHaveBeenCalledTimes(1);
        expect(cli._order._items).toEqual(['Tea']);
      })

      it('throws error if order is empty', () => {
        cli._order = new Order(1, 'Andy');
        jest.spyOn(cli, 'finaliseItems');
        jest.spyOn(cli, 'takeOrder');
        jest.spyOn(cli, 'checkForItemDiscount');
        jest.spyOn(console, 'error');
  
        cli.finaliseItems();
  
        expect(console.error).toHaveBeenCalledWith("\nError: No items have been added to the order yet");
        expect(cli.takeOrder).toHaveBeenCalledTimes(1);
        expect(cli.checkForItemDiscount).toHaveBeenCalledTimes(0);
      })
    })

    describe('cancelOrder', () => {
      it('can cancel an order', () => {
        jest.spyOn(cli, 'takeOrder');
        jest.spyOn(cli, 'cancelOrder');
        jest.spyOn(console, 'log');
        jest.spyOn(cli._rl, 'close');
  
        cli.takeOrder();
        cli._rl.input.emit('data', '9\n');
        cli._rl.input.emit('data', 'Yes\n');
  
        expect(cli.takeOrder).toHaveBeenCalledTimes(1);
        expect(cli.cancelOrder).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('\nOrder cancelled\n');
        expect(cli._rl.close).toHaveBeenCalledTimes(1);
      })
  
      it('wont cancel order if user responds no to warning', () => {
        jest.spyOn(cli, 'cancelOrder');
        jest.spyOn(cli, 'takeOrder');
        jest.spyOn(cli._rl, 'close');
  
        cli.cancelOrder();
        cli._rl.input.emit('data', 'No\n');
  
        expect(cli.takeOrder).toHaveBeenCalledTimes(1);
        expect(cli.cancelOrder).toHaveBeenCalledTimes(1);
        expect(cli._rl.close).toHaveBeenCalledTimes(0);
      })
  
      it('will throw error if user doesnt respond Yes or No to cancelOrder warning', () => {
        jest.spyOn(cli, 'cancelOrder');
        jest.spyOn(cli._rl, 'close');
        jest.spyOn(console, 'error');
  
        cli.cancelOrder();
        cli._rl.input.emit('data', 'test\n');
  
        expect(cli.cancelOrder).toHaveBeenCalledTimes(2);
        expect(cli._rl.close).toHaveBeenCalledTimes(0);
        expect(console.error).toHaveBeenCalledWith("\nError: Please respond 'Yes' or 'No'");
      })
    })
  })

  describe('checkForItemDiscount', () => {
    it('asks for the name of the discounted item if customer has voucher', () => {
      jest.spyOn(cli, 'getItemDiscountName');
      jest.spyOn(console, 'log');

      cli.checkForItemDiscount();
      cli._rl.input.emit('data', 'Yes\n');

      expect(cli.getItemDiscountName).toHaveBeenCalledTimes(1);
    })

    it('doesnt create an item discount if user doesnt have a voucher', () => {
      jest.spyOn(cli, 'getItemDiscountName');
      jest.spyOn(cli, 'checkForTotalPriceDiscount');
      jest.spyOn(console, 'log');

      cli.checkForItemDiscount();
      cli._rl.input.emit('data', 'No\n');

      expect(cli.getItemDiscountName).toHaveBeenCalledTimes(0);
      expect(cli._itemDiscount).toEqual(null);
      expect(cli.checkForTotalPriceDiscount).toHaveBeenCalledTimes(1);
    })

    it('checks for item discount again if user response is not Yes/No', () => {
      jest.spyOn(cli, 'checkForItemDiscount');
      jest.spyOn(cli, 'getItemDiscountName');
      jest.spyOn(console, 'error');

      cli.checkForItemDiscount();
      cli._rl.input.emit('data', 'hi\n');

      expect(cli.checkForItemDiscount).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenCalledWith("\nError: Please respond 'Yes' or 'No'")
      expect(cli.getItemDiscountName).toHaveBeenCalledTimes(0);
      expect(cli._itemDiscount).toEqual(null);
    })

    describe('getItemDiscountName', () => {
      it('saves value and calls getItemDiscountPercent if name is valid', () => {
        jest.spyOn(cli, 'getItemDiscountPercent');
        
        cli.getItemDiscountName();
        cli._rl.input.emit('data', 'Americano\n');

        expect(cli._discountedItemName).toEqual('Americano');
        expect(cli.getItemDiscountPercent).toHaveBeenCalledTimes(1);
      })

      it('throws error if discounted item isnt on menu', () => {
        jest.spyOn(cli, 'getItemDiscountName');
        jest.spyOn(console, 'error');
  
        cli.checkForItemDiscount();
        cli._rl.input.emit('data', 'Yes\n');
        cli._rl.input.emit('data', 'Test\n');
  
        expect(cli.getItemDiscountName).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenCalledWith('Error: That item is not on the menu');
      })
    })

    describe('getItemDiscountPercent', () => {
      it('saves value and calls createItemDiscountObject if name is valid', () => {
        jest.spyOn(cli, 'createItemDiscountObject');

        cli.getItemDiscountPercent();
        cli._rl.input.emit('data', '20\n');

        expect(cli._itemDiscountPercent).toEqual(20);
        expect(cli.createItemDiscountObject).toHaveBeenCalledTimes(1);
      })
      
      it('throws error if percentage is falsy', () => {
        jest.spyOn(cli, 'getItemDiscountPercent');
        jest.spyOn(console, 'error');
  
        cli.checkForItemDiscount();
        cli._rl.input.emit('data', 'Yes\n');
        cli._rl.input.emit('data', 'Tea\n');
        cli._rl.input.emit('data', '\n');
  
        expect(cli.getItemDiscountPercent).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenCalledWith('Error: Please enter a number');
      })

      it('throws error if percentage is not between 1 and 100', () => {
        jest.spyOn(cli, 'getItemDiscountPercent');
        jest.spyOn(console, 'error');
  
        cli.checkForItemDiscount();
        cli._rl.input.emit('data', 'Yes\n');
        cli._rl.input.emit('data', 'Tea\n');
        cli._rl.input.emit('data', '101\n');
  
        expect(cli.getItemDiscountPercent).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenCalledWith('Error: Discount percent must be between 1 and 100');
      })
    })

    describe('createItemDiscountObject', () => {
      it('creates an item discount object', () => {
        jest.spyOn(cli, 'checkForTotalPriceDiscount');
        jest.spyOn(console, 'log');
        const mockItemDiscount = new ItemDiscount('Tea', 10);
        cli._discountedItemName = 'Tea';
        cli._itemDiscountPercent = 10;
  
        cli.createItemDiscountObject();
  
        expect(console.log).toHaveBeenCalledWith('\nDiscount added: 10% off Teas');
        expect(cli._itemDiscount).toEqual(mockItemDiscount);
        expect(cli.checkForTotalPriceDiscount).toHaveBeenCalledTimes(1);
      })
      
      it('closes the application if there is an error when creating the itemDiscountObject', () => {
        jest.spyOn(cli._rl, 'close');
        
        cli.createItemDiscountObject();
  
        expect(cli._rl.close).toHaveBeenCalledTimes(1);
      })
    })
  })

  describe('checkForTotalPriceDiscount', () => {
    it('doesnt create a totalPriceDiscount if customer doesnt have a voucher', () => {
      jest.spyOn(cli, 'createPriceCalculatorObject');

      cli.checkForTotalPriceDiscount();
      cli._rl.input.emit('data', 'No\n');

      expect(cli._totalPriceDiscount).toEqual(null);
      expect(cli.createPriceCalculatorObject).toHaveBeenCalledTimes(1);
    })

    it('throws error if response isnt Yes/No', () => {
      jest.spyOn(cli, 'checkForTotalPriceDiscount');

      cli.checkForTotalPriceDiscount();
      cli._rl.input.emit('data', 'ooo\n');

      expect(cli.checkForTotalPriceDiscount).toHaveBeenCalledTimes(2);
      expect(cli._totalPriceDiscount).toEqual(null);
    })

    it('calls getMinTotalPrice if response is Yes', () => {
      jest.spyOn(cli, 'getMinTotalPrice');

      cli.checkForTotalPriceDiscount();
      cli._rl.input.emit('data', 'Yes\n');

      expect(cli.getMinTotalPrice).toHaveBeenCalledTimes(1);
    })

    describe('getMinTotalPrice', () => {
      it('throws error if input is falsy', () => {
        jest.spyOn(cli, 'getMinTotalPrice');
        jest.spyOn(console, 'error');
  
        cli.checkForTotalPriceDiscount();
        cli._rl.input.emit('data', 'Yes\n');
        cli._rl.input.emit('data', '\n');
  
        expect(cli.getMinTotalPrice).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenCalledWith('Error: Please enter a number');
      })
      
      it('throws error if minTotalPrice is a negative number', () => {
        jest.spyOn(cli, 'getMinTotalPrice');
        jest.spyOn(console, 'error');
  
        cli.getMinTotalPrice()
        cli._rl.input.emit('data', '-1\n');
  
        expect(cli.getMinTotalPrice).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenCalledWith('Error: Min total price must not be a negative number');
      })
  
      it('saves value and calls getTotalDiscountPercent if minTotalPrice is valid', () => {
        jest.spyOn(cli, 'getTotalDiscountPercent');
  
        cli.getMinTotalPrice();
        cli._rl.input.emit('data', '20\n');
  
        expect(cli._minTotalPriceForDiscount).toEqual(20);
        expect(cli.getTotalDiscountPercent).toHaveBeenCalledTimes(1);
      })
    })

    describe('getTotalDiscountPercent', () => {
      it('saves value and calls createTotalPriceDiscount if input is valid', () => {
        jest.spyOn(cli, 'createTotalPriceDiscountObject');
        
        cli.getTotalDiscountPercent();
        cli._rl.input.emit('data', '10\n');
  
        expect(cli._totalPriceDiscountPercent).toEqual(10);
        expect(cli.createTotalPriceDiscountObject).toHaveBeenCalledTimes(1);
      })
  
      it('throws error if percentage is falsy', () => {
        jest.spyOn(cli, 'getTotalDiscountPercent');
        jest.spyOn(console, 'error');
  
        cli.checkForTotalPriceDiscount();
        cli._rl.input.emit('data', 'Yes\n');
        cli._rl.input.emit('data', '10\n');
        cli._rl.input.emit('data', '\n');
  
        expect(cli.getTotalDiscountPercent).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenCalledWith('Error: Please enter a number');
      })

      it('throws error if input is not between 1 and 100 and calls get percent again', () => {
        jest.spyOn(cli, 'getTotalDiscountPercent');
        jest.spyOn(cli, 'createTotalPriceDiscountObject');
        jest.spyOn(console, 'error');
        
        cli.getTotalDiscountPercent();
        cli._rl.input.emit('data', '101\n');
  
        expect(cli._totalPriceDiscountPercent).toEqual(null);
        expect(console.error).toHaveBeenCalledWith('Error: Discount percent must be between 1 and 100')
        expect(cli.getTotalDiscountPercent).toHaveBeenCalledTimes(2);
        expect(cli.createTotalPriceDiscountObject).toHaveBeenCalledTimes(0);
      })
    })

    describe('createTotalPriceDiscountObject', () => {
      it('creates a totalPriceDiscount object', () => {
        jest.spyOn(cli, 'createPriceCalculatorObject');
        jest.spyOn(console, 'log');
        cli._minTotalPriceForDiscount = 10;
        cli._totalPriceDiscountPercent = 5;
  
        cli.createTotalPriceDiscountObject();
  
        expect(console.log).toHaveBeenCalledWith('\nDiscount added: 5% off orders over $10');
        expect(cli.createPriceCalculatorObject).toHaveBeenCalledTimes(1);
      })
  
      it('closes the application if there is an error when creating the itemDiscountObject', () => {
        jest.spyOn(cli._rl, 'close');
        
        cli.createTotalPriceDiscountObject();
  
        expect(cli._rl.close).toHaveBeenCalledTimes(1);
      })
    })
  })

  describe('createPriceCalculatorObject', () => {
    it('creates a priceBreakdown object when there are no discounts', () => {
      cli._order = new Order(1, 'Andy');
      cli._order.addItem('Americano');
      jest.spyOn(cli, 'takePayment');

      cli.createPriceCalculatorObject();

      expect(cli._priceCalculator.calculateTotalPrice()).toEqual(3.75);
      expect(cli.takePayment).toHaveBeenCalledTimes(1);
    })

    it('creates a priceBreakdown object when there are discounts', () => {
      cli._order = new Order(1, 'Andy');
      cli._order.addItem('Americano');
      cli._itemDiscount = new ItemDiscount('Americano', 10);
      cli._totalPriceDiscount = new TotalPriceDiscount(1, 5);
      jest.spyOn(cli, 'takePayment');

      cli.createPriceCalculatorObject();

      expect(cli._priceCalculator.calculateTotalPrice()).toEqual(3.21);
      expect(cli.takePayment).toHaveBeenCalledTimes(1);
    })

    it('prints the total price', () => {
      cli._order = new Order(1, 'Andy');
      cli._order.addItem('Americano');
      jest.spyOn(console, 'log');

      cli.createPriceCalculatorObject();

      expect(console.log).toHaveBeenCalledWith('\nTotal price: $3.75');
    })

    it('closes app if no order is created', () => {
      jest.spyOn(console, 'error');
      jest.spyOn(cli._rl, 'close');
      
      cli.createPriceCalculatorObject();

      expect(console.error).toHaveBeenCalledWith("Error: Can't calculate the price of an empty order");
      expect(cli._rl.close).toHaveBeenCalledTimes(1);
    })
  })

  describe('takePayment', () => {
    it('closes app if priceCalculator hasnt been created', () => {
      jest.spyOn(console, 'error');
      jest.spyOn(cli._rl, 'close');
      
      cli.takePayment();

      expect(console.error).toHaveBeenCalledWith("\nError: Can't take payment if price hasnt been calculated");
      expect(cli._rl.close).toHaveBeenCalledTimes(1);
    })
  })
})
