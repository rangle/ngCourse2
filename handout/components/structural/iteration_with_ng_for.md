# Iteration with `ngFor`

When we have a list of items, we can use the `ngFor` directive within our component's template to create identical DOM elements for each item. It can be used several ways, such as:

- `<li *ngFor="let item of items; let i = index">...</li>`
- `<li template="ngFor let item of items; let i = index">...</li>`
- `<template ngFor let-item [ngForOf]="items" let-i="index"><li>...</li></template>`

[View Example](http://plnkr.co/edit/LhoxLd7QKvMOSPFKW5Pt?p=preview)
