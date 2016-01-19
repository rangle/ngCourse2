import {Injectable} from 'angular2/core';
import {Http, Request, Response, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import 'rxjs/add/operator/map';
import {ReplaySubject} from 'rxjs';
import {List} from 'immutable';

interface Task {
  owner: string;
  description: string;
}

@Injectable()
export default class TasksService {

  private _tasks = List<Task>();
  // The observable which the components can
  // utilize for change detection
  private _obsv: ReplaySubject<any>;

  constructor(
    private _http: Http,
    private _router: Router
  ) {
    this._obsv = new ReplaySubject(1);
    this.fetch();
  }

  /**
   * Get all tasks
   */
  fetch() {
    this._http.get('http://ngcourse.herokuapp.com/api/v1/tasks')
      .map((res: Response) => res.json())
      .subscribe((tasks: Array<Task>) => {
        this._tasks = this._tasks.push(...tasks);
        this._obsv.next(this._tasks);
      });
  }

  /**
   * Add a new task and
   * push updates to the observable
   * @param {Task} task New task to add to the list
   */
  add(task: Task) {
    // Create a request header to set content type to JSON
    const postHeaders = new Headers({ 'Content-Type': 'application/json' });

    this._http.post(
      'http://ngcourse.herokuapp.com/api/v1/tasks',
      JSON.stringify(task), {
        headers: postHeaders
      }
    )
      .map((res: Response) => res.json())
      .subscribe((res) => {
        this._tasks = this._tasks.push(...res);
        this._obsv.next(this._tasks);
        this.goToTasksList();
      });
  }

  /**
   * Navigate to the tasks list view
   */
  goToTasksList() {
    this._router.navigate(['/Main']);
  }

  /**
   * Getter for the Observable
   */
  get obsv() {
    return this._obsv;
  }

}
