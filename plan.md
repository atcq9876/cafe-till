# Plan

## SPEC - Version 1 / Sprint 1

Implement a system that contains the business logic to produce receipts similar to this, based on a `json` price list and test orders. A sample `.json` [file](cafeMenu.json) has been provided with the list of products sold at this particular coffee shop. 

Here are some sample orders you can try - whether you use this information is up to you:

> **Jane**  
> 2 x Cafe Latte  
> 1 x Blueberry Muffin  
> 1 x Choc Mudcake  
>
> **John**  
> 4 x Americano  
> 2 x Tiramisu  
> 5 x Blueberry Muffin  

Your receipt must calculate and show the correct amount of tax (in this shop's case, 8.64%), as well as correct line totals and total amount. Do not worry about calculating discounts or change yet. Consider what output formats may be suitable.


## PLAN - Version 1 / Sprint 1

### Classes
Order
- constructor(table, names)
    - this._table = table;
    - this._names = names; (names is a comma-separated string list of names, or one single name)
    - this._items = [];
- addItem(item)
    - Takes individual items (strings) one by one and adds them to this.items
- removeItem(item)
    - removes an item from this.items (that has the same name)
- get and set methods where applicable for names, table, items

Receipt
- constructor(order)
    - Takes an Order object as an argument (uses order.table, order.names and order.items)
    - throw error if argument is not an Order object (typeof "order")
    - this._order = order; 
    - this._receipt = ''; (or don't bother with instance variable and just get formatReceipt to return receipt to printReceipt)
- printReceipt()
    - calls formatReceipt();
    - prints receipt;
- #formatReceipt()
    - updates this.receipt to include all cafe info, date&time, names, ordered items (and quantity of them)
    - uses cafeMenu.json to add individual prices next to items
    - calls calculatePrice() to get the totalPrice
    - calls calculateTax() to get tax (not added to totalPrice, just a portion of the totalPrice)
- #calculatePrice()
    - uses this.order.items and cafeMenu.json to update this.totalPrice
- #calculateTax()
    - 8.64% of totalPrice


## Ideas for later sprints
Add a Payment class for handling payments, change, etc.
- Think about how best to incorporate this, e.g., what arguments/objects it will take, how its return values will then be returned to the receipt, etc.

**Extract price, tax and all money things to a separate class, then inject this into Receipt**
class PriceCalculator {
  constructor(order) {
    this.#validateOrder;
    this._order = order;
  }

  <!-- move from Receipt to PriceCalculator -->
  #calculateTotalPrice() {

  }

  #calculateTax() {

  }
}

Version 2
---------

- Add functionality to take payment and calculate correct change.  
class Payment {
    constructor(paymentCalculator, cash) {
        - validate paymentCalculator
        - validate cash
        - this.paymentCalculator = paymentCalculator
        - this.cash = cash
    }

    calculateChange() {
        return cash - paymentCalculator.calculateTotalPrice()
    }
}


- Add functionality to handle discounts - in this example, a 5% discount on orders over $50, and a 10% muffin discount.
        - Could add this to PaymentCalculator class and pass a discount(object?) to the PC class for this

class totalPriceDiscount {
    constructor(minTotalPrice, discountPercent) {
        validate minTotalPrice
        this.minTotalPrice = minTotalPrice
        validate discountPercent
        this._discountPercent = discountPercent
    }

    getMinTotalPrice() {
        return minTotalPrice
    }

    getDiscountPercent() {
        return discountPercent
    }
}

class itemDiscount {
    constructor(itemName, discountPercent) {
        validate itemName
        this._itemName = itemName
        validate discountPercent
        this._discountPercent = discountPercent
    }

    getItemName() {
        return itemName
    }
    
    getDiscountPercent() {
        return discountPercent
    }
}


old test for priceCalculator
  // it('provides a discount for orders over a certain price', () => {
  //   const MockOrder = createMockOrder(['Tiramisu', 'Tiramisu', 'Affogato', 'Affogato', 'Affogato']);
  //   const order = new MockOrder();
  //   const priceCalculator = new PriceCalculator(order);
  //   const minPriceForDiscount = 50;
  //   const discount = 5;
  //   priceCalculator.addTotalPriceDiscount(minPriceForDiscount, discount);

  //   // 67.2 * 0.95 = 63.84
  //   expect(priceCalculator.calculateTotalPrice()).toEqual(63.84);
  // })




<!-- class itemDiscount {
    constructor(order, itemName, discountPercent) {
        validate order
        this._order = order
        validate itemName
        this._itemName = itemName
        validate discountPercent
        this._discountPercent = discountPercent
    }
    
    itemDiscount() {
        if (order.includes(itemName)) {
            discount = menu.prices.item.price * this._discountPercent
            return discount
        }
    }
} -->