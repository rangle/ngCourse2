import {Component} from 'angular2/core';
import {DelayPipe} from './delay.pipe';

@Component({
	selector: 'Hello',
	template: `<div>
    <ul>
        <li>{{ 1 | delay}}</li>
        <li>{{ 3 | delay}}</li>
        <li>{{ 2 | delay}}</li>
        <li>{{ 4 | delay}}</li>
     </ul>
</div>`,
	pipes: [DelayPipe]
})
export class Hello {
  
}