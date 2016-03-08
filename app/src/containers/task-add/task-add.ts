import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import TaskForm from '../../components/task-form/task-form';
import {Router} from 'angular2/router';
const TEMPLATE = require('./task-add.html');
import {addTask} from '../../actions/tasks';

@Component({
  selector: 'ngc-task-add',
  directives: [TaskForm],
  template: TEMPLATE
})
export default class TaskAdd implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  cancelLink: any[] = ['/Tasks']
  

  constructor( 
    @Inject('ngRedux') private _ngRedux, 
    public _router: Router) { }

  ngOnInit() {
   
  }

  ngOnDestroy() {
   
  }

  

  submitTask(newTask): void {
    // Random ID just for now...
    newTask._id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    this._ngRedux.dispatch(addTask(newTask));
    this._router.navigate(['/Tasks'])
    
  }
}
