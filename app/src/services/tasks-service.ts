import {Injectable} from 'angular2/core';
import {Http, Request, Response, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import 'rxjs/add/operator/map';
import {List} from 'immutable';

export interface Task {
  owner: string;
  description: string;
  _id: string;
  done?: boolean;
}

// Create a request header to set content type to JSON
const HEADERS = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export default class TasksService {

  private _tasks = List<Task>();
  private _owner = 'everyone';

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
   * Get a task by id
   * @param {string} id
   */
  getById(id: string) {
    const index = this._tasks.findIndex((t) => t._id === id);
    return this._tasks.get(index);
  }

  /**
   * Add a new task
   * @param {Task} task New task to add to the list
   */
  add(task: Task) {
    this._http.post(
      'http://ngcourse.herokuapp.com/api/v1/tasks',
      JSON.stringify(task), {
        headers: HEADERS
      }
    )
      .map((res: Response) => res.json())
      .subscribe((res) => {
        this._tasks = this._tasks.push(...res);
        this.goToTasksList();
      });
  }

  /**
   * Delete a task
   * @param {Task} task The task to delete
   */
  delete(task: Task) {
    const index = this._tasks.findIndex((t) => t._id === task._id);

    this._http.delete(
      `http://ngcourse.herokuapp.com/api/v1/tasks/${task._id}`
    )
      .map((res: Response) => res.json())
      .subscribe((res) => {
        if (res === 1) {
          this._tasks = this._tasks.delete(index);

          // if we deleted the owner's last task, set owner to "everyone"
          const ownerTaskCount = this._tasks.filter(t =>
            t.owner === task.owner
          ).size;

          if (ownerTaskCount === 0) {
            this.selectOwner('everyone');
          }
        }
      });
  }

  /**
   * Set the done status of a task
   * @param {Task} task The task to be updated
   * @param  {Boolean} done Done status
   */
  done(task: Task, done: boolean) {
    const index = this._tasks.findIndex((t) => t._id === task._id);
    const updatedTask = {
      done: true,
      owner: task.owner,
      description: task.description,
      _id: task._id
    };

    this._http.put(
       `http://ngcourse.herokuapp.com/api/v1/tasks/${task._id}`,
       JSON.stringify(updatedTask), {
         headers: HEADERS
       }
     )
       .map((res: Response) => res.json())
       .subscribe((res) => {
         this._tasks = this._tasks.set(index, updatedTask);
       });
   }

  /**
   * Update a task
   * @param {Task} task The task to update
   */
  update(task: Task) {
    const index = this._tasks.findIndex((t) => t._id === task._id);
    
    this._http.put(
      `http://ngcourse.herokuapp.com/api/v1/tasks/${task._id}`,
      JSON.stringify(task), {
        headers: HEADERS
      }
    )
      .map((res: Response) => res.json())
      .subscribe((res) => {
        if (res.length === 1) {
          this._tasks = this._tasks.set(index, task);
          this.goToTasksList();
        }
      });
  }

  /**
   * Sets the owner of tasks we're displaying
   * @param {string} name of the owner
   */
  selectOwner(owner) {
    this._owner = owner;  
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

  get owner() {
    return this._owner;
  }
}
