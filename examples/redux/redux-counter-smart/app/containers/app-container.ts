import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Counter} from '../components/counter-component';

@Component({
	selector: 'simple-redux',
	directives: [Counter]
	template: `<div>
	<h1>Redux: Smart Counter</h1>
	<counter>
  </counter>
</div>
	`
})

export class SimpleRedux {
  
}