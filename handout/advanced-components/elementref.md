# ElementRef

Provides access to the underlying native element (DOM node).

```js
import {AfterContentInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <h1>My App</h1>
  <pre style="background: #eee; padding: 1rem; border-radius: 3px; overflow: auto;">
    <code>{{ node }}</code>
  </pre>
`
})
export class App implements AfterContentInit {
  node: string;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit() {
    const tmp = document.createElement('div');
    const el = this.elementRef.nativeElement.cloneNode(true);

    tmp.appendChild(el);
    this.node = tmp.innerHTML;
  }

}
```


[View Example](https://plnkr.co/edit/mPgthXMvwet6QBQ331cV?p=preview)
