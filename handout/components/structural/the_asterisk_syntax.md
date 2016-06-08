# The Asterisk (*) Syntax

The asterisk is syntactic sugar to make writing templates easier. Here is an example that uses the verbose `<template>` syntax:

```html
<template [ngIf]="condition">
  <div>{{ hero }}</div>
</template>
```

Which can be simplified using the * syntax:

```html
<div *ngIf="hero">{{ hero }}</div>
```

For more info see: [angular.io/guide/template-syntax/star-template](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#star-template)
