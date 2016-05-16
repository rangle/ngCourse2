# Custom Pipes #

Angular 2 also allows you to create your own custom pipes:

```javascript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'length'})
export class LengthPipe implements PipeTransform {
  transform(value:string, displayMessage: boolean): string {
    return displayMessage ? `${value} ${value.length}` : `${value.length}`
  }
}
```
[View Example](http://plnkr.co/edit/32JQu9QHma84ej01g5iX?p=preview)

Each custom pipe implementation must:

* Have the `@Pipe` decorator with pipe metadata that has a `name` property. This value will be used to
call this pipe in template expressions. It must be a valid JavaScript identifier.
* Implement the `PipeTransform` interface's transform method. This method takes the value being piped
and a variable number of arguments of any type and return a transformed/"piped" value.

The colon delimited parameters given in the template will each map to one method argument in the same order.

```javascript
import {Component} from '@angular/core';
import {LengthPipe} from './length.pipe';

@Component({
	selector: 'Hello',
	template: '<div><p>{{ message | length:true }}</p><p>{{ message | length:false }}</p></div>',
	pipes: [LengthPipe]
})
export class Hello {
  message: string = 'Hello There';
}
```
[View Example](http://plnkr.co/edit/rw7qt6UaIqUMjE89MWDq?p=preview)
