import {Component, View, Inject} from 'angular2/core';
import {bindActionCreators} from 'redux';
import Grid from '../components/grid/grid';
import * as CounterActions from '../actions/counter';

interface Item {
  title: string;
  content: string;
}

@Component({
  selector: 'root',
  directives: [Grid],
  template: `
  <div class="container px1">
    <header class="navy mt4 mb3 border-bottom py1">
      <a href="http://rangle.io"
        class="h5 bold caps compact">
        rangle.io
      </a>
      <h1 class="m0">ngCourse2</h1>
    </header>
    <grid [items]="items"></grid>
  </div>
  `
})
export default class App {

  protected unsubscribe: Function;
  public items: Array<Item> = Array(30).map(x => {
    return {
      title: 'alice beeblebrox',
      content: 'Learn Angular 2 so that I can build an app'
    };
  });

  constructor( @Inject('ngRedux') ngRedux) {
    this.unsubscribe = ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis
    )(this);
  }

  onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      counter: state.counter
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(CounterActions, dispatch);
  }
}
