# Projection

Components by default support projection. You can use the `ngContent` directive to place the projected content.

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

[View Example](http://plnkr.co/edit/d2X7P2lxw4jrIBnElGrI?p=preview)

<iframe class="no-pdf" style="width: 100%; height: 800px" src="http://embed.plnkr.co/d2X7P2lxw4jrIBnElGrI/" frameborder="0" allowfullscren="allowfullscren"></iframe>