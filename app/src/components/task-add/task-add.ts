import {Component} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {
  FORM_PROVIDERS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators
} from '@angular/common';
import TasksService from '../../services/tasks-service';
const TEMPLATE = require('./task-add.html');

@Component({
  selector: 'ngc-task-add',
  directives: [RouterLink, FORM_DIRECTIVES],
  viewProviders: [FORM_PROVIDERS],
  template: TEMPLATE
})
export default class TaskAdd {

  taskAddForm: ControlGroup;

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
