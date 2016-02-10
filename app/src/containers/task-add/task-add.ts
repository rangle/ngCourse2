import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {RouterLink, Router} from 'angular2/router';
import {
  FORM_BINDINGS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators
} from 'angular2/common';
const TEMPLATE = require('./task-add.html');
import * as TaskActions from '../../actions/tasks';

@Component({
  selector: 'ngc-task-add',
  directives: [RouterLink, FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  template: TEMPLATE
})
export default class TaskAdd implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  addTask: Function;
  taskAddForm: ControlGroup;

  constructor( 
    @Inject('ngRedux') private ngRedux, 
    public _router: Router,
    private _builder: FormBuilder
  ) {
    this.taskAddForm = _builder.group({
      owner: ['', Validators.required],
      description: ['', Validators.required],
      done: [false]
    });
  }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis, 
      this.mapDispatchToThis
    )(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      tasks: state.tasks,
      owner: state.filters.get('owner'),
      taskStatus: state.filters.get('taskStatus')
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(TaskActions, dispatch);
  }

  onSubmit(): void {
    this.addTask(this.taskAddForm.value, () => {
      this._router.navigate(['/Main']);
    });
  }
}
