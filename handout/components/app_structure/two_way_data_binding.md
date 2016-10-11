# Using Two-Way Data Binding

Two-way data binding combines the input and output binding into a single notation using the `ngModel` directive.

```html
<input [(ngModel)]="name" >
```

What this is doing behind the scenes is equivalent to:

```html
<input [ngModel]="name" (ngModelChange)="name=$event">
```

To create your own component that supports two-way binding, you must define an `@Output` property to match an `@Input`, but suffix it with the `Change`, for example:

```js
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div>
      <p>
        <ng-content></ng-content>
        Count: {{ count }} -
        <button (click)="increment()">Increment</button>
      </p>
    </div>
  `
})
export class Counter {
  @Input() count: number = 0;
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```

[View Example](http://plnkr.co/edit/nwRNxpoTuk4M60Y5Khq8?p=preview)
