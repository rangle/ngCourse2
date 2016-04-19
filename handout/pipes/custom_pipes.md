# Custom Pipes #

Angular 2 also allows you to create your own custom pipes:

```javascript
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'length'})
export class LengthPipe implements PipeTransform {
  transform(value:string, args:string[]) : any {
    let displayMessage: boolean = Boolean(args[0]);
    return displayMessage ? `${value} ${value.length}` : `${value.length}`
  }
}
```
[View Example](http://plnkr.co/edit/QrOAQL?p=preview)

Each custom pipe implementation must:

* Have `@Pipe` decorator with pipe metadata with a `name` property whose value is
what the pipe will be called in template expressions. It must be a valid JavaScript identifier.
* Implement the `PipeTransform` interface's transform method. This method takes an input value
and an optional array of parameter strings and returns the transformed value.

There will be one item in the parameter array for each parameter passed to the pipe

```javascript
import {Component} from 'angular2/core';
import {LengthPipe} from './length.pipe';

@Component({
	selector: 'Hello',
	template: '<div><p>{{ message | length:true}}</p><p>{{ message | length:false}}</p></div>',
	pipes: [LengthPipe]
})
export class Hello {
  message: string = 'Hello There';
}
```
[View Example](http://plnkr.co/edit/QrOAQL?p=preview)
