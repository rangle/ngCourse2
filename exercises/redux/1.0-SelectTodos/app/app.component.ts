import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import  todoApp from './reducers/index';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app.component.css'],
  template: `
  <h2>todos</h2>
  <ul>

  </ul>
  `
})
export class AppComponent {

}
