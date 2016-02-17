import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {ClickContainer} from './click-container.ts';
import {CurseContainer} from './curse-container.ts';

import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';


@Component({
	selector: 'simple-redux',
	directives: [CurseContainer, ClickContainer]
	template: `<div>
	<h1>Redux: Dumb Counter</h1>
  <click-counter></click-counter>
  <curse-counter></curse-counter>
  <curse-counter></curse-counter>
</div>

	`
})

export class SimpleRedux {
  
}