import { Observable } from 'rxjs';
import {Injectable, Inject} from 'angular2/core';

@Injectable()
export default class StateService {
  store: any; 
  constructor(@Inject('ngRedux') ngRedux) {
    this.store = this.observableFromStore(ngRedux);

  }
  observableFromStore = (store) => {
    return Observable.create(observer =>
      store.subscribe(() => observer.next(store.getState()))
    );
  }
}
