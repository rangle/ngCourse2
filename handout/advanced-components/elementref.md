# ElementRef

Provides access to the underlying native element (DOM node).

```js
import {Component, ElementRef} from 'angular2/core';

@Component({
  selector: 'todo-app',
  template: `...`
})
export class TodoApp {

  constructor(
    private elementRef: ElementRef
  ) {
    const container = this.elementRef.nativeElement;
  }

}
```


[View Example](http://plnkr.co/edit/QkNbKQh6ya1WX0YdUahX?p=preview)

<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/QkNbKQh6ya1WX0YdUahX" frameborder="0" allowfullscren="allowfullscren"></iframe>
