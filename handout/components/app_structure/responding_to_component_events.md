# Responding to Component Events

An event handler is specified inside the template using round brackets to denote event binding. This event handler is then coded in the class to process the event.

```js
import {Component} from '@angular/core';

@Component({
  selector: 'rio-counter',
  template: `
    <div>
      <p>Count: {{num}}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class CounterComponent {
  num: number;

  constructor() {
    this.num = 0;
  }

  increment() {
    this.num++;
  }
}
```

[View Example](http://plnkr.co/edit/l4FweMxodN8I26OeqhGH?p=preview)

To send data out of components via outputs, start by defining the outputs attribute. It accepts a list of output parameters that a component exposes to its parent.

`app/counter.component.ts`
```js
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rio-counter',
  templateUrl: 'app/counter.component.html'
})
export class CounterComponent {
  @Input()  count: number;
  @Output() result: EventEmitter;

  constructor() {
    this.count = 0;
    this.result = new EventEmitter();
  }

  increment() {
    this.count++;
    this.result.emit(this.count);
  }
}
```

`app/counter.component.html`
```html
<div>
  <p>Count: {{ count }}</p>
  <button (click)="increment()">Increment</button>
</div>
```

`app/app.component.ts`
```js
import { Component, OnChange } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnChange {
  num: number;
  parentCount: number;

  constructor() {
    this.num = 0;
    this.parentCount = 0;
  }

  ngOnChange(val: any) {
    this.parentCount = val;
  }
}
```

`app/app.component.html`
```html
<div>
  Parent Num: {{ num }}<br />
  Parent Count: {{ parentCount }}
  <rio-counter [count]="num" (result)="ngOnChange($event)">
  </rio-counter>
</div>
```

[View Example](http://plnkr.co/edit/fYgi05?p=preview)

Together a set of input + output bindings define the public API of your component. In our templates we use the [squareBrackets] to pass inputs and the (parenthesis) to handle outputs.
