# ElementRef

Provides access to the underlying native element (DOM element).

```js
import { AfterContentInit, Component, ElementRef } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
    <h1>My App</h1>
    <pre>
      <code>{{ node }}</code>
    </pre>
  `
})
export class AppComponent implements AfterContentInit {
  node: string;

  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit() {
    const tmp = document.createElement('div');
    const el = this.elementRef.nativeElement.cloneNode(true);

    tmp.appendChild(el);
    this.node = tmp.innerHTML;
  }

}
```
[View Example](https://plnkr.co/edit/TY7SrMXs8XoV6AOYwn9k?p=preview)
