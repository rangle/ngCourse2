import {Component} from '@angular/core';
import {
  ActivatedRoute,
  ROUTER_DIRECTIVES
} from '@angular/router';
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
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  viewProviders: [FORM_PROVIDERS],
  template: TEMPLATE
})
export default class TaskEdit {

  taskEditForm: ControlGroup;
  sub: any;

  constructor(
    private _builder: FormBuilder,
    private _tasksService: TasksService,
    private _route: ActivatedRoute
  ) {
  }

  private ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      const task = this._tasksService.getById(params['id']);

      this.taskEditForm = this._builder.group({
        _id: [task._id, Validators.required],
        owner: [task.owner, Validators.required],
        description: [task.description, Validators.required],
        done: [task.done]
      });
    });
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(): void {
    this._tasksService.update(this.taskEditForm.value);
  }
}
