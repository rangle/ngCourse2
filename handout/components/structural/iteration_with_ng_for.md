# Iteration with `ngFor`

When we have a list of items, we can use the `ngFor` directive within our component's template to create identical DOM element for each item. It can be used in a few different ways, for example:

- `<li *ngFor="#item of items; #i = index">...</li>`
- `<li template="ngFor #item of items; #i = index">...</li>`
- `<template ngFor #item [ngForOf]="items" #i="index"><li>...</li></template>`

[View Example](http://plnkr.co/edit/afIb8ldLVD7F0PbDueri?p=preview)
