import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { SimpleNgrx } from './containers/app-container';
import { counterReducer } from './reducers/counter-reducer';

bootstrap(SimpleNgrx, [
  provideStore({ counter: counterReducer })
]);

