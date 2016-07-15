import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { select } from 'ng2-redux';
import  todoApp from './reducers/index';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app.component.css'],
  template: `
  <h2>todos</h2>
  <ul>
    <li *ngFor="let todo of todos$ | async">
      <input type="checkbox" [checked]="todo.completed">
      <label>{{todo.title}}</label>
    </li>
  </ul>
  `
})
export class AppComponent {
  @select() todos$;
  constructor(private ngRedux: NgRedux<any>) {
    this.ngRedux.configureStore(todoApp, {});
  }
}
