# Responding to Component Events

An event handler is specified inside the template using round brackets to denote event binding. This event handler is then coded in the class to process the event.

```javascript
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
  num = 0;

  increment() {
    this.num++;
  }
}
```

[View Example](http://plnkr.co/edit/l4FweMxodN8I26OeqhGH?p=preview)

To send data out of components via outputs, start by defining the outputs attribute. It accepts a list of output parameters that a component exposes to its parent.

`app/counter.component.ts`

```javascript
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rio-counter',
  templateUrl: 'app/counter.component.html'
})
export class CounterComponent {
  @Input()  count = 0;
  @Output() result = new EventEmitter<number>();

  increment() {
    this.count++;
    this.result.emit(this.count);
  }
}
```

`app/counter.component.html`

```markup
<div>
  <p>Count: {{ count }}</p>
  <button (click)="increment()">Increment</button>
</div>
```

`app/app.component.ts`

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  num = 0;
  parentCount = 0;

  changeParentCount(val: number) {
    this.parentCount = val;
  }
}
```

`app/app.component.html`

```markup
<div>
  Parent Num: {{ num }}<br>
  Parent Count: {{ parentCount }}
  <rio-counter [count]="num" (result)="changeParentCount($event)">
  </rio-counter>
</div>
```

[View Example](http://plnkr.co/edit/5RYLZ0?p=preview)

Together a set of input + output bindings define the public API of your component. In our templates we use the \[squareBrackets\] to pass inputs and the \(parenthesis\) to handle outputs.
