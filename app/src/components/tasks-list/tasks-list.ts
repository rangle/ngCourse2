import {Component} from 'angular2/core';
import Grid from '../grid/grid';
import Tasks from '../../services/tasks';

@Component({
  selector: 'tasks-list',
  directives: [Grid],
  template: `
  <grid [tasks]="tasks"></grid>
  `
})
export default class TasksList {

  public tasks;

  constructor(
    private _tasks: Tasks
  ) {
     _tasks.obsv
      .subscribe(tasks => this.tasks = tasks);
  }

}
