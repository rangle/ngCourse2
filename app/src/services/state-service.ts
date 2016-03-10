import { BehaviorSubject } from 'rxjs';
import {Injectable, Inject} from 'angular2/core';
import {bindActionCreators} from 'redux';

@Injectable()
export default class StateService {

  store: any;
  private _ngRedux: any;

  constructor( @Inject('ngRedux') ngRedux) {
    this.store = this.observableFromStore(ngRedux);
    this._ngRedux = ngRedux;

    this._ngRedux.subscribe(() => this.store.next(this._ngRedux.getState()));
  }

  select(selector: any, comparer?:(x: any, y: any)=> boolean) {
  console.log(`observers: ${this.store.observers.length}`)
    if (
      typeof selector === 'string' ||
      typeof selector === 'number' ||
      typeof selector === 'symbol'
    ) {
      return this.store.map(state => state[selector]).distinctUntilChanged(comparer);
    }
    else if (typeof selector === 'function') {
      return this.store.map(selector).distinctUntilChanged(comparer)
    }
  }

  observableFromStore = (store) => new BehaviorSubject(store.getState());

  dispatch = (action) => {
    return this._ngRedux.dispatch(action)
  };

  
}
