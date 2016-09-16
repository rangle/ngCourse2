import { Component } from '@angular/core';

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
  constructor() {
  }
}
