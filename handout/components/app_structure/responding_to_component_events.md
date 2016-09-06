# Responding to Component Events

Events in Angular 2 work similar to how they worked in Angular 1.x. The big change is template syntax.

```js
import {Component} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div>
      <p>Count: {{ num }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class Counter {
  num: number = 0;

  increment() {
    this.num++;
  }
}
```

[View Example](http://plnkr.co/edit/7L0mRb6DqhXUtFA1poZ3?p=preview)

To send data out of components via outputs, start by defining the outputs attribute. It accepts a list of output parameters that a component exposes to its parent.

```js
import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'counter',
  inputs: ['count'],
  outputs: ['result'],
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export default class Counter {
  count: number = 0;
  result: EventEmitter<number> = new EventEmitter<number>();

  increment() {
    this.count++;
    this.result.emit(this.count);
  }
}
```

[View Example](http://plnkr.co/edit/iMoehv7loiV5twHWkyca?p=preview)

Together a set of input + output bindings define the public API of your component. In our templates we use the [squareBrackets] to pass inputs and the (parenthesis) to handle outputs.
