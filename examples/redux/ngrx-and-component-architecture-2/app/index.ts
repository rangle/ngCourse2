import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { SimpleNgrx } from './containers/app-container';
import { counterReducer } from './reducers/counter-reducer.ts';
import { curseReducer } from './reducers/curse-reducer.ts';

bootstrap(SimpleNgrx, [
  provideStore({
    counter: counterReducer,
    curse: curseReducer
  }),
]);
