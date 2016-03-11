import {AsyncPipe} from 'angular2/common';
import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {Router, RouteConfig, RouterOutlet} from 'angular2/router';
import {TaskMap} from '../../services/tasks-service';
import AuthService from '../../services/auth-service';
import TaskAdd from '../task-add/task-add';
import TaskEdit from '../task-edit/task-edit';
import Summary from '../summary';
import TaskGrid from '../../components/task-grid/task-grid';
import {StatusPipe} from '../../pipes/status';
import {OwnerTasksPipe} from '../../pipes/owners';
import  TaskActions from '../../actions/tasks';
import {List, is} from 'immutable';
import StateService from '../../services/state-service';
const TASKS_TEMPLATE = require('./tasks.html');
import { Observable } from 'rxjs';
@Component({
  selector: 'ngc-main',
  pipes: [OwnerTasksPipe, StatusPipe, AsyncPipe],
  directives: [RouterOutlet, TaskGrid],
  template: TASKS_TEMPLATE
})
@RouteConfig([{
  path: '/',
  name: 'TaskSummary',
  component: Summary,
  useAsDefault: true
}, {
    path: '/add',
    name: 'TaskAdd',
    component: TaskAdd
  }, {
    path: '/:id',
    name: 'TaskEdit',
    component: TaskEdit
  }])
export default class Tasks implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  tasks: List<TaskMap>;
  owner: string;
  taskStatus: string;
  owner$: any;
  status$: any;
  tasks$: any;
  tasksTest$: any;


  constructor(

    public authService: AuthService,
    private _router: Router,
    private stateService: StateService,
    private taskActions: TaskActions
  ) { }

  ngOnInit() {



    this.owner$ = this.stateService.select(state => state.filters.get('owner'));
    this.status$ = this.stateService.select(state=> state.filters.get('taskStatus'));
    this.tasks$ = this.stateService.select(state=> state.tasks)
      .combineLatest(this.owner$, this.status$, (tasks, owner, status) => {
        return tasks.filter(n=> {
          const isDone = status === 'completed';
          return (n.get('done') === isDone || status === 'all')
            && (n.get('owner') === owner || owner === 'everyone')
        })
      }).subscribe(tasks=> this.tasks = tasks)
    let x = 0;

     this.tasksTest$ = this.stateService.select(state=> state.tasks, is).subscribe(n=> {
       console.log('this is called... yeah',++x)
     },(err)=>console.log(err), ()=>console.log('done'))

    this.loadTasks();

    if (!this.authService.isLoggedIn()) {
      this._router.navigate(['/Login']);
    }
  }

  ngOnDestroy() {
    this.owner$.unsubscribe();
    this.status$.unsubscribe();
    this.tasks$.unsubscribe();
    this.tasksTest$.unsubscribe();
    //this.unsubscribe();
  }




  editTask(taskId) {

    this._router.navigate(['Tasks', 'TaskEdit', { id: taskId }])
  }
  randomUpdate() {

    let names = ['Alice', 'Bob', 'Eric','Evan','James','John','Jane','Darren','Emily','Seth']
    this.tasks.forEach(n=> {
      let x  = n.toJS() as any;
      x.owner = names[Math.floor(Math.random() * 10)];
      x.description = `Update!` + Math.floor(Math.random() * 10);

    //  this.stateService.dispatch(this.taskActions.updateTask(x));
    });

  }

  deleteTask = (task) => this.stateService.dispatch(this.taskActions.deleteTask(task))
  loadTasks = () => this.stateService.dispatch(this.taskActions.loadTasks())
  markTask =({task, newStatus}) => this.stateService.dispatch(this.taskActions.markTask(task, newStatus))

}
