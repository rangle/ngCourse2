import {Injectable} from 'angular2/core';
import {Http, Request, Response, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import 'rxjs/add/operator/map';
import {List} from 'immutable';

interface Task {
  owner: string;
  description: string;
}

@Injectable()
export default class TasksService {

  private _tasks = List<Task>();

  constructor(
    private _http: Http,
    private _router: Router
  ) {
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
      });
  }

  /**
   * Add a new task
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
   * Getter for the tasks list
   */
  get tasks() {
    return this._tasks;
  }

}
