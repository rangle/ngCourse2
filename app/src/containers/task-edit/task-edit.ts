import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {TaskMap} from '../../services/tasks-service';
import {
  Router, 
  RouterLink, 
  RouteParams,
  ROUTER_DIRECTIVES
} from 'angular2/router';
import {
  FORM_BINDINGS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators
} from 'angular2/common';
const TEMPLATE = require('./task-edit.html');
import * as TaskActions from '../../actions/tasks';
import {List} from 'immutable';
  
@Component({
  selector: 'ngc-task-edit',
  directives: [RouterLink, ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  template: TEMPLATE
})
export default class TaskEdit implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  tasks: List<TaskMap>;
  updateTask: Function;
  taskEditForm: ControlGroup;

  constructor(
    @Inject('ngRedux') private ngRedux,
    private _builder: FormBuilder,
    private _router: Router,
    public params: RouteParams
  ) {}

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis, 
      this.mapDispatchToThis
    )(this);

    const task = this.tasks.find(t => 
      t.get('_id') === this.params.get('id')
    );

    this.taskEditForm = this._builder.group({
      _id: [task.get('_id'), Validators.required],
      owner: [task.get('owner'), Validators.required],
      description: [task.get('description'), Validators.required],
      done: [task.get('done')]
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      tasks: state.tasks
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(TaskActions, dispatch);
  }

  onSubmit(): void {
    this.updateTask(this.taskEditForm.value, () => {
      this._router.navigate(['/Main']);
    });
  }
}
