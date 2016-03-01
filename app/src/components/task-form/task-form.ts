import {
Component,
Input,
Output,
EventEmitter,
ChangeDetectionStrategy,
OnInit
} from 'angular2/core';

import {
RouterLink,
Router
} from 'angular2/router';

import {
FORM_BINDINGS,
FORM_DIRECTIVES,
ControlGroup,
FormBuilder,
Validators
} from 'angular2/common';

import {
Map,
fromJS
} from 'immutable';
const TEMPLATE = require('./task-form.html');

@Component({
  selector: 'ngc-task-form',
  directives: [RouterLink, FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  template: TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TaskForm implements OnInit {

  @Input() cancelLink: any[] = ['/']
  @Input() formTitle: string;
  @Input() task: Map<string, any> = Map<string, any>(
    {
      _id: undefined,
      owner: '',
      description: '',
      done: false
    });
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();


  taskForm: ControlGroup;

  constructor(private _builder: FormBuilder) { }

  ngOnInit() {
    this.taskForm = this._builder.group({
      _id: [this.task.get('_id')],
      owner: [this.task.get('owner'), Validators.required],
      description: [this.task.get('description'), Validators.required],
      done: [this.task.get('done')]
    });
  }

  submitTask(taskForm: ControlGroup): void {
    this.onSubmit.emit(taskForm.value);
  }
}
