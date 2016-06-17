import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Counter } from '../components/counter-component';
import logger from '../store/configure-logger';
import reducer from '../reducers/index';

@Component({
	selector: 'simple-redux',
	directives: [ Counter ]
	template: `
  	<div>
    	<h1>Redux: Two components, one state.</h1>
      <div style="float: left; border: 1px solid red;">
        <h2>Click Counter</h2>
      	<counter>
        </counter>
      </div>
      <div style="float: left; border: 1px solid blue;">
        <h2>Curse Counter</h2>
      	<counter>
        </counter>
      </div>
    </div>
	`
})
export class SimpleRedux {
  constructor(ngRedux: NgRedux) {
    const initialState = {};
    const middleware = [ logger ];
    ngRedux.configureStore(reducer, initialState, middleware);
  }
}