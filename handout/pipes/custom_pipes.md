# Custom Pipes #

We can create custom pipes also similar to custom filters in Angular 1.x. Below is the example of Custom pipe implementation. 

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

* Have `@Pipe` decorator with pipe metadata
* Implement the PipeTransform interface's with transform method that takes an input value and an optional array of parameter strings and returns the transformed value
* There will be one item in the parameter array for each parameter passed to the pipe
* We tell Angular that this is a pipe by applying the @Pipe decorator which we import from the core Angular library
* The `@Pipe` decorator takes an object with a name property whose value is the pipe name that we'll use within a template expression. It must be a valid JavaScript identifier. Our pipe's name is LengthPipe

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
