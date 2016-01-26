import {Component} from 'angular2/core';
import {RouterLink, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {
  FORM_BINDINGS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators
} from 'angular2/common';
import TasksService from '../../services/tasks-service';
const TEMPLATE = require('./task-edit.html');
  
@Component({
  selector: 'ngc-task-edit',
  directives: [RouterLink, ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  template: TEMPLATE
})
export default class TaskEdit {

  public taskEditForm: ControlGroup;

  constructor(
    private _builder: FormBuilder,
    private _tasksService: TasksService,
    public params: RouteParams
  ) {
    const task = _tasksService.getById(params.get('id'));

    this.taskEditForm = _builder.group({
      _id: [task._id, Validators.required],
      owner: [task.owner, Validators.required],
      description: [task.description, Validators.required]
    });
  }

  onSubmit(): void {
    this._tasksService.update(this.taskEditForm.value);
  }
}
