# Custom Pipes #

Angular 2 allows you to create your own custom pipes:

```javascript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {
  transform(value: string, displayMessage: boolean): string {
    return displayMessage ? `${value} ${value.length}` : `${value.length}`
  }
}
```
[View Example](http://plnkr.co/edit/l5koabsVYdoIhHDe24pR?p=preview)

Each custom pipe implementation must:

* have the `@Pipe` decorator with pipe metadata that has a `name` property. This value will be used to
call this pipe in template expressions. It must be a valid JavaScript identifier.
* implement the `PipeTransform` interface's transform method. This method takes the value being piped
and a variable number of arguments of any type and return a transformed ("piped") value.

Each colon-delimited parameter in the template maps to one method argument in the same order.

```javascript
import {Component} from '@angular/core';

@Component({
	selector: 'hello',
	template: `
	  <div>
	    <p>{{ message | length:true }}</p>
	    <p>{{ message | length:false }}</p>
    </div>`
})
export class Hello {
  message: string = 'Hello There';
}
```
[View Example](http://plnkr.co/edit/l5koabsVYdoIhHDe24pR?p=preview)
