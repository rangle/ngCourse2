# ElementRef

Provides access to the underlying native element (DOM node).

```js
import {Component, ElementRef} from '@angular/core';

@Component({
	selector: 'app',
	template: `
  <h1>My App</h1>
  <pre style="background: #eee; padding: 1rem; border-radius: 3px; overflow: auto;"> 
    <code>{{ node }}</code>
  </pre>
`
})
export class App {
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


[View Example](http://plnkr.co/edit/XLoF3ZNrIGX8nj01RJZb?p=preview)

<iframe style="width: 100%; height: 600px" src="http://embed.plnkr.co/XLoF3ZNrIGX8nj01RJZb/" frameborder="0" allowfullscren="allowfullscren"></iframe>
