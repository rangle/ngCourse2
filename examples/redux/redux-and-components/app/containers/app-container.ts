import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import reducer from '../reducers/index';
import logger from '../store/configure-logger';

@Component({
	selector: 'simple-redux'
	template: `
	<div>
  	<h1>Redux: Smart Counter</h1>
  	<counter>
    </counter>
  </div>
	`
})
export class SimpleRedux {
  constructor(redux: NgRedux) {
    redux.configureStore(reducer, {}, [ logger ]);
  }
}
