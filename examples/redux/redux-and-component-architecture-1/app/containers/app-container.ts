import { Component } from '@angular/core';

@Component({
	selector: 'simple-redux',
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
  constructor() {
  }
}
