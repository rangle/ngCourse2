import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import TaskForm from '../../components/task-form/task-form';
import {Router, RouteParams } from 'angular2/router';
import { COMMON_DIRECTIVES } from 'angular2/common';
import {updateTask} from '../../actions/tasks';
import {List, Map} from 'immutable';

const TEMPLATE = require('./task-edit.html');

@Component({
  selector: 'ngc-task-edit',
  directives: [COMMON_DIRECTIVES, TaskForm],
  template: TEMPLATE
})
export default class TaskEdit implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  task: Map<string, any>;
  cancelLink: any[] = ['/Tasks']

  get taskId(): string {
    return this._params.get('id');
  }

  constructor(
    @Inject('ngRedux') private _ngRedux,
    private _router: Router,
    private _params: RouteParams
  ) { }

  ngOnInit() {
    this.unsubscribe = this._ngRedux.connect(
      (state) => this.mapStateToThis(state)
    )(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis = (state) => {
    return {
      task: state.tasks.find(t => t.get('_id') === this.taskId)
    };
  }

  updateTask(task) {
    this._ngRedux.dispatch(updateTask(task))
  }

  submitTask(taskForm): void {
    this.updateTask(taskForm)
    this._router.navigate(['/Tasks']);
  }


}
