import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Hello} from './hello.component';

@Component({
	selector: 'app',
	template: `
    <div>
	    <hello name="World"></hello>
	    <hello name="Other World"></hello>
	    <hello #last name="Last World"></hello>
	  </div>
	  <button (click)="onClickAll()">Randomize Hello colors</button>
	  <button (click)="onClickLast()">Randomize only last Hello color</button>
	  <p>Calls function on child component classes to randomize color of them.</p>`
})
export class App {
  @ViewChildren(Hello) helloChildren: QueryList<Hello>;
  @ViewChild('last') lastChild: Hello;

  constructor() {}

  onClickAll() {
    this.helloChildren.forEach((child) => child.randomizeColor());
  }

  onClickLast() {
    this.lastChild.randomizeColor();
  }
}
