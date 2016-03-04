import {Injectable, Inject} from 'angular2/core';
let {observableFromStore} = require('redux-rx');

@Injectable()
export default class StateService {
  store: any; 
  constructor(@Inject('ngRedux') ngRedux) {
    this.store = observableFromStore(ngRedux);

  }
}
