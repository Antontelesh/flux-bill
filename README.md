# flux-bill
Learning ReactJS+Flux with an example application

## Scope of this lesson

1. Learn how to write applications with Flux architecture
2. Learn how to handle complex form validation with ReactJS+Flux
3. Learn how to use React router

## Application description

The app should provide a way to create bills.
It should be presented in the form of three views:

1. Bill form.
2. Bill preview.
3. List of created bills.

### Bill form

The form should have inputs for user to type general information about the bill (a date bill was created, bill number, etc.), and well as list of goods bill contains.

Each of goods list item should have inputs about the goods item: name, measurement, quantity, price and total.

The total input should be calculated automatically by the formulae:
<code>total = quantity * price</code>

User should be able to change total input value. In that case the quantity field should be updated by the formulae:
<code>quantity = total / price</code>

There should be a total amount of the document as well.
It should be calculated by the formulae:
<code>document_total = reduce(sum, pluck('total', goods))</code>

The user should not be able to change document total amount directly.

### Bill preview

The data user provided in the form should be presented in a bill preview.
It can be a simple list of bill properties.

### List of created bills

This should be a simple list of created bills. Each list item should contain the title composed of bill number and the date it was created. Also there should be column for bill total amount.
