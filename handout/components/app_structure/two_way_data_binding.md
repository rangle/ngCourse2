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
@Component({/*....*/})
export default class Counter {
  @Input() count: number = 0;
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}

@Component({
  template:'<counter [(count)]="myNumber"></counter>'
  directives:[Counter]
})
class SomeComponent {
  // ...
}
```

[View Example](http://plnkr.co/edit/m99s4JZD4cJ96Cvgc3ri?p=preview)
