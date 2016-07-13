import { Component, View, Inject } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Person } from '../components/person';
import { PeopleActions } from '../actions/people-actions';
import rootReducer from '../reducers/index';
import { actionLogger } from '../middleware/action-logger';
import { reduxDevTools } from '../enhancers/redux-dev-tools';

@Component({
  selector: 'app',
  providers: [ PeopleActions ],
  directives: [ Person ],
  template: `
    <person
      *ngFor="let currentPerson of people$ | async" 
      [person]="currentPerson">
    </person>
  `
})
export class App {
  @select(s => s.people.toJS()) people$: Observable<any>;

  constructor(
    redux: NgRedux,
    private actions: PeopleActions) {

    redux.configureStore(
      rootReducer,
      {},
      [ actionLogger ],
      [ reduxDevTools ]);
  }
}
