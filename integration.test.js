const Order = require('./order');
const Receipt = require('./receipt');


describe('integration', () => {
  it('prints correct receipt for order of three items', () => {
    const table = 3;
    const names = 'Geoff, June';
    const order = new Order(table, names);
    order.addItem('Americano');
    order.addItem('Americano');
    order.addItem('Muffin Of The Day');

    const receipt = new Receipt(order);
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
      + 'Valid 01/05/2023 to 31/05/2023\n'
      + 'Table: 3 / [4]\n'
      + 'Geoff, June\n'
      + ' Americano            2 x 3.75\n'
      + ' Muffin Of The Day    1 x 4.55\n\n'
      + 'Tax:                     $1.04\n'
      + 'Total:                  $12.05\n';
    
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

    const receipt = new Receipt(order);
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
      + 'Valid 01/05/2023 to 31/05/2023\n'
      + 'Table: 1 / [4]\n'
      + 'Geoff, June, John, Jen\n'
      + ' Cappucino            1 x 3.85\n'
      + ' Flat White           2 x 4.75\n'
      + ' Tea                  1 x 3.65\n'
      + ' Choc Mudcake         1 x 6.40\n\n'
      + 'Tax:                     $2.02\n'
      + 'Total:                  $23.40\n';
    
    expect(receipt.printReceipt()).toEqual(expectedReceipt);
  })

  test(('throws error if passing an order with no items to receipt'), () => {
    const emptyOrder = new Order(2, 'Name');
    expect(() => {
      new Receipt(emptyOrder);
    }).toThrow('Orders must contain at least one item');
  })
})
