import {Inject, Injectable} from 'angular2/core';
import {Http, Request, Response, Headers} from 'angular2/http';
import StateService from './state-service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
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
@Injectable()
export default class TasksService {

  constructor(
    private _http: Http,
    private stateService: StateService
  ) {
    stateService.select(n=>n.tasks).subscribe(n=>{
      console.log('yo - accessing state in my services',n)
    })
  }

  fetch() {
    return this._http.get('http://ngcourse.herokuapp.com/api/v1/tasks')
      .map((res: Response) => res.json())
      .share();
  }

  add(task: Task) {
    delete task._id;
    return this._http.post(
      'http://ngcourse.herokuapp.com/api/v1/tasks',
      JSON.stringify(task), {
        headers: HEADERS
      }
    )
      .map((res: Response) => res.json())
      .share();
  }

  update(task: Task) {

    return this._http.put(
      `http://ngcourse.herokuapp.com/api/v1/tasks/${task._id}`,
      JSON.stringify(task), {
        headers: HEADERS
      }
    )
      .map((res: Response) => res.json())
      .share();

  }

  delete(task: TaskMap) {
    return this._http.delete(
      `http://ngcourse.herokuapp.com/api/v1/tasks/${task.get('_id')}`
    )
      .map((res: Response) => res.json())
      .share();
  }
}
