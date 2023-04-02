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
    - _this.table = table;
    - _this.names = names; (names is a comma-separated string list of names, or one single name)
    - _this.items = [];
- addItem(item)
    - Takes individual items (strings) one by one and adds them to this.items
- removeItem(item)
    - removes an item from this.items (that has the same name)
- editNames(names)
    - _this.names = names;

Receipt
- constructor(order)
    - Takes an Order object as an argument (uses order.table, order.names and order.items)
    - _this.order = order; 
    - _this.receipt = ''; (or don't bother with instance variable and just get formatReceipt to return receipt to printReceipt)
- printReceipt()
    - calls formatReceipt();
    - prints receipt;
- private formatReceipt()
    - updates this.receipt to include all cafe info, date&time, names, ordered items (and quantity of them)
    - uses cafeMenu.json to add individual prices next to items
    - calls calculatePrice() to get the totalPrice
    - calls calculateTax() to get tax (not added to totalPrice, just a portion of the totalPrice)
- private calculatePrice()
    - uses this.order.items and cafeMenu.json to update this.totalPrice
- private calculateTax()
    - 8.64% of totalPrice



## Ideas for later sprints
Add a Payment class for handling payments, change, etc.