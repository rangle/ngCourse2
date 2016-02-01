# Projection

Components by default support projection. You can use the `ngContent` directive to place the projected content.

```js
import {Component, Input} from 'angular2/core';

@Component({
  selector: 'child',
  template: `
    <h4>Child Component</h4>
    <ng-content></ng-content>
  `
})
class Child {}
```

[View Example](http://plnkr.co/edit/LgCjXI5QH7jZkXgwwnsF?p=preview)

<iframe style="width: 100%; height: 800px" src="https://embed.plnkr.co/LgCjXI5QH7jZkXgwwnsF" frameborder="0" allowfullscren="allowfullscren"></iframe>