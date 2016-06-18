import {Component} from '@angular/core';
import {
  RouterLink, 
  RouteParams, 
  ROUTER_DIRECTIVES
} from '@angular/router-deprecated';
import {
  FORM_PROVIDERS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators
} from '@angular/common';
import TasksService from '../../services/tasks-service';
const TEMPLATE = require('./task-edit.html');
  
@Component({
  selector: 'ngc-task-edit',
  directives: [RouterLink, ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  viewProviders: [FORM_PROVIDERS],
  template: TEMPLATE
})
export default class TaskEdit {

  taskEditForm: ControlGroup;

  constructor(
    private _builder: FormBuilder,
    private _tasksService: TasksService,
    public params: RouteParams
  ) {
    const task = _tasksService.getById(params.get('id'));

    this.taskEditForm = _builder.group({
      _id: [task._id, Validators.required],
      owner: [task.owner, Validators.required],
      description: [task.description, Validators.required],
      done: [task.done]
    });
  }

  onSubmit(): void {
    this._tasksService.update(this.taskEditForm.value);
  }
}
