# Using Two-Way Data Binding

Two-way data binding combines the input and output binding into a single notation using the `ngModel` directive.

```html
<input [(ngModel)]="name" >
```

What this is doing behind the scenes is equivalent to:

```html
<input [ngModel]="name" (ngModelChange)="name=$event">
```

To create your own component that supports two-way binding, you must define an `@Output` property to match an `@Input`, but suffix it with the `Change`. The code example below, inside class CounterComponent shows how to make property count support two-way binding.

`app/counter.component.ts`
```js
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rio-counter',
  templateUrl: 'app/counter.component.html'
})
export class CounterComponent {
  @Input() count = 0;
  @Output() countChange = new EventEmitter<number>();

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```

`app/counter.component.html`
```html
<div>
  <p>
    <ng-content></ng-content>
    Count: {{ count }} -
    <button (click)="increment()">Increment</button>
  </p>
</div>
```

[View Example](http://plnkr.co/edit/nkww1Ov2AWZRMHFyjhjl?p=preview)
