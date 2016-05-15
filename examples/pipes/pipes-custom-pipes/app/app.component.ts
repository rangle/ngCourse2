import {Component} from '@angular/core';
import {LengthPipe} from './length.pipe';

@Component({
	selector: 'hello',
	template: '<div><p>{{ message | length:true }}</p><p>{{ message | length:false }}</p></div>',
	pipes: [LengthPipe]
})
export class Hello {
  message: string = 'Hello There';
}