import {Inject} from 'angular2/core';
import {Http, Request, Response, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {List, Map} from 'immutable';

export interface Task {
  owner: string;
  description: string;
  _id: string;
  done: boolean;
}

export interface TaskMap extends Map<string, any> { }

// Create a request header to set content type to JSON
const HEADERS = new Headers({ 'Content-Type': 'application/json' });

export default class TasksService {
  
  constructor(
    @Inject(Http) private _http
  ) {}

  fetch() {
    return this._http.get('http://ngcourse.herokuapp.com/api/v1/tasks')
      .map((res: Response) => res.json());
  }

  add(task: Task) {
    return this._http.post(
      'http://ngcourse.herokuapp.com/api/v1/tasks',
      JSON.stringify(task), {
        headers: HEADERS
      }
    )
    .map((res: Response) => res.json());
  }

  update(task: Task) {
    return this._http.put(
      `http://ngcourse.herokuapp.com/api/v1/tasks/${task._id}`,
      JSON.stringify(task), {
        headers: HEADERS
      }
    )
    .map((res: Response) => res.json());
  }

  delete(task: TaskMap) {
    return this._http.delete(
      `http://ngcourse.herokuapp.com/api/v1/tasks/${task.get('_id')}`
    )
    .map((res: Response) => res.json());
  }
}
