# Projection

Components by default support projection. You can use the `ngContent` directive to place the projected content in your template.

```js
import {Component, Input} from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <h4>Child Component</h4>
    <ng-content></ng-content>
  `
})
class Child {}
```

[View Example](http://plnkr.co/edit/yS8KAVGjQ9NdBEB2fDO6?p=preview)
