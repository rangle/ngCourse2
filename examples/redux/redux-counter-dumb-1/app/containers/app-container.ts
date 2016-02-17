import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Counter} from '../components/counter-component';

@Component({
	selector: 'simple-redux',
	directives: [Counter]
	template: `<div>
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
	`
})

export class SimpleRedux {
  
}