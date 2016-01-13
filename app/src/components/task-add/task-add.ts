import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {
  FORM_BINDINGS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators
} from 'angular2/common';
import Tasks from '../../services/tasks';

@Component({
  selector: 'task-add',
  directives: [RouterLink, FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  template: `
  <div class="sm-col-10 mx-auto border rounded">
    <div class="p2 gray bg-darken-1">
      <h4 class="m0 caps">Add Task</h4>
    </div>
    <form class="p2 bg-white"
      [ngFormModel]="taskAddForm"
      (ngSubmit)="onSubmit(taskAddForm)">
      <label for="owner">Owner</label>
      <input class="block col-12 mb1 field"
        id="owner"
        type="text"
        ngControl="owner">
      <label for="description">Description</label>
      <input class="block col-12 mb2 field"
        id="description"
        type="text"
        ngControl="description">
      <button class="btn btn-primary"
        ng-click="ctrl.save(newTask)"
        [disabled]="!taskAddForm.valid">
        Save
      </button>
      <button class="btn btn-primary bg-gray"
        [routerLink]="['/Main']">
        Cancel
      </button>
    </form>
  </div>
  `
})
export default class TaskAdd {

  public taskAddForm: ControlGroup;

  constructor(
    private _builder: FormBuilder,
    private _tasks: Tasks
  ) {
    this.taskAddForm = _builder.group({
      owner: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this._tasks.add(this.taskAddForm.value);
  }

}
