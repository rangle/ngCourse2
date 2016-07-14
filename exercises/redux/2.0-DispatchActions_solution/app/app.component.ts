import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { select } from 'ng2-redux';
import  todoApp from './reducers/index';
import * as TodoActions from './actions/index';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app.component.css'],
  template: `
  <h2>todos</h2>
  <ul>
    <li *ngFor="let todo of todos$ | async">
      <input type="checkbox" [checked]="todo.completed" (change)="toggleTodo(todo.id)">
      <label [style.text-decoration]="todo.completed ? 'line-through' : 'none'">{{todo.title}}</label>
    </li>
  </ul>
  `
})
export class AppComponent {
  @select() todos$;
  constructor(private ngRedux: NgRedux<any>) {
    this.ngRedux.configureStore(todoApp, {});
  }

  toggleTodo = (id) => this.ngRedux.dispatch(
    <any>TodoActions.toggleTodo(id));
}
