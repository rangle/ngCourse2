import {Inject} from 'angular2/core';
import {Http, Request, Response, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {List, Map} from 'immutable';

export interface ITaskService {

}
export interface Task {
  owner: string;
  description: string;
  _id: string;
  done: boolean;
}

export interface TaskMap extends Map<string, any> {
  owner: string;  
  description: string; 
  _id: string; 
  done: boolean;
}

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

 
}
