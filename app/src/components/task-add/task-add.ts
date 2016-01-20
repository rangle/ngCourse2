import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {
  FORM_BINDINGS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators
} from 'angular2/common';
import TasksService from '../../services/tasks-service';
const TEMPLATE = require('./task-add.html');

@Component({
  selector: 'ngc-task-add',
  directives: [RouterLink, FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  template: TEMPLATE
})
export default class TaskAdd {

  public taskAddForm: ControlGroup;

  constructor(
    private _builder: FormBuilder,
    private _tasksService: TasksService
  ) {
    this.taskAddForm = _builder.group({
      owner: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this._tasksService.add(this.taskAddForm.value);
  }

}
