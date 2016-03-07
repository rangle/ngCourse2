import { Observable } from 'rxjs';
import {Injectable, Inject} from 'angular2/core';

@Injectable()
export default class StateService {
  store: any; 
  constructor(@Inject('ngRedux') ngRedux) {
    this.store = this.observableFromStore(ngRedux);

  }
  select(selector: any) {
    if (
      typeof selector === 'string' ||
      typeof selector === 'number' ||
      typeof selector === 'symbol'
    ) {
      return this.store.map(state => state[selector]).distinctUntilChanged();
    }
    else if (typeof selector === 'function') {
      return this.store.map(selector).distinctUntilChanged();
    }
  }
  observableFromStore = (store) => {
    return Observable.create(observer =>
      store.subscribe(() => observer.next(store.getState()))
    );
  }

}
