const Order = require('./order');
const Receipt = require('./receipt');
const PriceCalculator = require('./priceCalculator');
const Payment = require('./payment');
const ItemDiscount = require('./itemDiscount');
const TotalPriceDiscount = require('./totalPriceDiscount');
const CLI = require('./CLI');

describe('integration', () => {
  it('prints correct receipt for order of three items', () => {
    const table = 3;
    const names = 'Geoff, June';
    const order = new Order(table, names);
    order.addItem('Americano');
    order.addItem('Americano');
    order.addItem('Muffin Of The Day');

    const priceCalculator = new PriceCalculator(order);
    
    const cash = 15;
    const payment = new Payment(priceCalculator, cash)

    const receipt = new Receipt(order, priceCalculator, payment);
    const currentDateAndTime = new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace(/\..+/, '')
      .replace(/-/g, '.')
      + '\n';
    const expectedReceipt = currentDateAndTime
      + 'The Coffee Connection\n\n'
      + '123 Lakeside Way\n'
      + 'Phone: +1 (650) 360-0708\n\n'
      + 'Voucher 10% Off All Muffins!\n'
      + 'Valid 01/04/2023 to 31/12/2023\n\n'
      + 'Table: 3 / [4]\n'
      + 'Geoff, June\n'
      + ' Americano            2 x 3.75\n'
      + ' Muffin Of The Day    1 x 4.55\n\n'
      + 'Tax:                     $1.04\n'
      + 'Total:                  $12.05\n'
      + 'Cash:                   $15.00\n'
      + 'Change:                  $2.95\n';
    
    expect(receipt.printReceipt()).toEqual(expectedReceipt);
  })

  it('prints correct receipt for order of five items', () => {
    const table = 1;
    const names = 'Geoff, June, John, Jen';
    const order = new Order(table, names);
    order.addItem('Cappucino');
    order.addItem('Flat White');
    order.addItem('Flat White');
    order.addItem('Tea');
    order.addItem('Choc Mudcake');

    const priceCalculator = new PriceCalculator(order);
    
    const cash = 30;
    const payment = new Payment(priceCalculator, cash)

    const receipt = new Receipt(order, priceCalculator, payment);
    const currentDateAndTime = new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace(/\..+/, '')
      .replace(/-/g, '.')
      + '\n';
    const expectedReceipt = currentDateAndTime
      + 'The Coffee Connection\n\n'
      + '123 Lakeside Way\n'
      + 'Phone: +1 (650) 360-0708\n\n'
      + 'Voucher 10% Off All Muffins!\n'
      + 'Valid 01/04/2023 to 31/12/2023\n\n'
      + 'Table: 1 / [4]\n'
      + 'Geoff, June, John, Jen\n'
      + ' Cappucino            1 x 3.85\n'
      + ' Flat White           2 x 4.75\n'
      + ' Tea                  1 x 3.65\n'
      + ' Choc Mudcake         1 x 6.40\n\n'
      + 'Tax:                     $2.02\n'
      + 'Total:                  $23.40\n'
      + 'Cash:                   $30.00\n'
      + 'Change:                  $6.60\n';
    
    expect(receipt.printReceipt()).toEqual(expectedReceipt);
  })

  test(('throws error if passing an order with no items to receipt'), () => {
    const emptyOrder = new Order(2, 'Name');
    expect(() => {
      new Receipt(emptyOrder);
    }).toThrow('Orders must contain at least one item');
  })

  it('prints correct receipt for order of five items with discounts', () => {
    const table = 1;
    const names = 'Andy, June, John, Jen';
    const order = new Order(table, names);
    order.addItem('Cappucino'); // 3.85
    order.addItem('Flat White'); // 4.75
    order.addItem('Flat White'); // 4.75
    order.addItem('Tea'); // 3.65
    order.addItem('Choc Mudcake'); // 6.40
    // Total price w/o discounts = 23.40

    // Cappucino discounted price = 2.89
    // Total price w/ 25% off cappucino discount = 22.44
    const itemName = 'Cappucino';
    const itemDiscountPercent = 25;
    const itemDiscount = new ItemDiscount(itemName, itemDiscountPercent);

    // Total price w/ 10% off total discount = 20.20
    // Total discount value = 23.40 - 20.20 = 3.20
    const minTotalPrice = 10;
    const totalDiscountPercent = 10;
    const totalPriceDiscount = new TotalPriceDiscount(minTotalPrice, totalDiscountPercent)

    const priceCalculator = new PriceCalculator(order, itemDiscount, totalPriceDiscount);
    
    const cash = 25;
    const payment = new Payment(priceCalculator, cash)

    const receipt = new Receipt(order, priceCalculator, payment);
    const currentDateAndTime = new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace(/\..+/, '')
      .replace(/-/g, '.')
      + '\n';
    const expectedReceipt = currentDateAndTime
      + 'The Coffee Connection\n\n'
      + '123 Lakeside Way\n'
      + 'Phone: +1 (650) 360-0708\n\n'
      + 'Voucher 10% Off All Muffins!\n'
      + 'Valid 01/04/2023 to 31/12/2023\n\n'
      + 'Table: 1 / [4]\n'
      + 'Andy, June, John, Jen\n'
      + ' Cappucino            1 x 3.85\n'
      + ' Flat White           2 x 4.75\n'
      + ' Tea                  1 x 3.65\n'
      + ' Choc Mudcake         1 x 6.40\n\n'
      + 'Discount:                $3.20\n'
      + 'Tax:                     $1.75\n'
      + 'Total:                  $20.20\n'
      + 'Cash:                   $25.00\n'
      + 'Change:                  $4.80\n';
    
    expect(receipt.printReceipt()).toEqual(expectedReceipt);
  })

  it('prints correct receipt for order of five items with different total discount', () => {
    const table = 1;
    const names = 'Andy, June, John, Jen';
    const order = new Order(table, names);
    order.addItem('Cappucino'); // 3.85
    order.addItem('Flat White'); // 4.75
    order.addItem('Flat White'); // 4.75
    order.addItem('Tea'); // 3.65
    order.addItem('Choc Mudcake'); // 6.40
    // Total price w/o discounts = 23.40

    // Cappucino discounted price = 2.89
    // Total price w/ 25% off cappucino discount = 22.44
    const itemName = 'Cappucino';
    const itemDiscountPercent = 25;
    const itemDiscount = new ItemDiscount(itemName, itemDiscountPercent);

    // Total price w/ 5% off total discount = 21.32
    // Total discount value = 23.40 - 21.32 = 2.08
    const minTotalPrice = 10;
    const totalDiscountPercent = 5;
    const totalPriceDiscount = new TotalPriceDiscount(minTotalPrice, totalDiscountPercent)

    const priceCalculator = new PriceCalculator(order, itemDiscount, totalPriceDiscount);
    
    const cash = 25;
    const payment = new Payment(priceCalculator, cash)

    const receipt = new Receipt(order, priceCalculator, payment);
    const currentDateAndTime = new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace(/\..+/, '')
      .replace(/-/g, '.')
      + '\n';
    const expectedReceipt = currentDateAndTime
      + 'The Coffee Connection\n\n'
      + '123 Lakeside Way\n'
      + 'Phone: +1 (650) 360-0708\n\n'
      + 'Voucher 10% Off All Muffins!\n'
      + 'Valid 01/04/2023 to 31/12/2023\n\n'
      + 'Table: 1 / [4]\n'
      + 'Andy, June, John, Jen\n'
      + ' Cappucino            1 x 3.85\n'
      + ' Flat White           2 x 4.75\n'
      + ' Tea                  1 x 3.65\n'
      + ' Choc Mudcake         1 x 6.40\n\n'
      + 'Discount:                $2.08\n'
      + 'Tax:                     $1.84\n'
      + 'Total:                  $21.32\n'
      + 'Cash:                   $25.00\n'
      + 'Change:                  $3.68\n';
    
    expect(receipt.printReceipt()).toEqual(expectedReceipt);
  })

  it('processes the order via a CLI', () => {
    const currentDateAndTime = new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace(/\..+/, '')
      .replace(/-/g, '.')
      + '\n';
    const expectedReceipt = currentDateAndTime
      + 'The Coffee Connection\n\n'
      + '123 Lakeside Way\n'
      + 'Phone: +1 (650) 360-0708\n\n'
      + 'Voucher 10% Off All Muffins!\n'
      + 'Valid 01/04/2023 to 31/12/2023\n\n'
      + 'Table: 1 / [4]\n'
      + 'Andy, June, John, Jen\n'
      + ' Cappucino            1 x 3.85\n'
      + ' Flat White           2 x 4.75\n'
      + ' Tea                  1 x 3.65\n'
      + ' Choc Mudcake         1 x 6.40\n\n'
      + 'Discount:                $2.08\n'
      + 'Tax:                     $1.84\n'
      + 'Total:                  $21.32\n'
      + 'Cash:                   $25.00\n'
      + 'Change:                  $3.68\n';
    
    jest.spyOn(console, 'log');
    const cli = new CLI();
    cli.start()
    cli._rl.input.emit('data', `1\n`);
    cli._rl.input.emit('data', `Andy, June, John, Jen\n`);
    cli._rl.input.emit('data', `1\n`);
    cli._rl.input.emit('data', `Cappucino\n`);
    cli._rl.input.emit('data', `1\n`);
    cli._rl.input.emit('data', `Flat White\n`);
    cli._rl.input.emit('data', `1\n`);
    cli._rl.input.emit('data', `Flat White\n`);
    cli._rl.input.emit('data', `1\n`);
    cli._rl.input.emit('data', `Tea\n`);
    cli._rl.input.emit('data', `1\n`);
    cli._rl.input.emit('data', `Choc Mudcake\n`);
    cli._rl.input.emit('data', `4\n`);
    cli._rl.input.emit('data', `Yes\n`);
    cli._rl.input.emit('data', `Cappucino\n`);
    cli._rl.input.emit('data', `25\n`);
    cli._rl.input.emit('data', `Yes\n`);
    cli._rl.input.emit('data', `10\n`);
    cli._rl.input.emit('data', `5\n`);
    cli._rl.input.emit('data', `25\n`);

    expect(console.log).toHaveBeenCalledWith(expectedReceipt);
  })
})
