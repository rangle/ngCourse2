# Iteration with `ngFor`

When we have a list of items, we can use the `ngFor` directive within our component's template to create identical DOM element for each item. It can be used in a few different ways, for example:

- `<li *ngFor="let item of items; let i = index">...</li>`
- `<li template="ngFor let item of items; let i = index">...</li>`
- `<template ngFor let-item [ngForOf]="items" let-i="index"><li>...</li></template>`

[View Example](http://plnkr.co/edit/ocL5lDcXwW4BDSqGNBeD?p=preview)

<iframe style="width: 100%; height: 300px" src="http://embed.plnkr.co/ocL5lDcXwW4BDSqGNBeD/" frameborder="0" allowfullscren="allowfullscren"></iframe>