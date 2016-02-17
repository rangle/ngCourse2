import {Component} from 'angular2/core';
import {ShoutPipe} from './shout-pipe';

@Component({
  selector: 'ngc-app',
  template: `<div>
    <p>{{ message | shout }}</p>
    <p>{{ message | shout:true }}<p>
    <p>{{ message | shout:false}}<p>
  </div>`,
  pipes: [ShoutPipe]
})
export class App {
  message: string = 'Hello There';
}