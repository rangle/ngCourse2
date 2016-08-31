import {Component, ContentChild, ContentChildren, QueryList} from '@angular/core';
import {Hello} from './hello.component';

@Component({
	selector: 'hello-list',
	template: `
	  <p>Projected content:</p>
    <div>
	    <ng-content></ng-content>
	  </div>
	  <button (click)="onClickAll()">Randomize Hello colors</button>
	  <button (click)="onClickLast()">Randomize only last Hello color</button>`
})
export class HelloList {
  @ContentChildren(Hello) helloChildren: QueryList<Hello>;
  @ContentChild('last') lastChild: Hello;

  constructor() {}
  ngAfterContentInit() {
    // Content children now set
    this.onClickAll();
  }

  onClickAll() {
    this.helloChildren.forEach((child) => child.randomizeColor());
  }

  onClickLast() {
    this.lastChild.randomizeColor();
  }
}
