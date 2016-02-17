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