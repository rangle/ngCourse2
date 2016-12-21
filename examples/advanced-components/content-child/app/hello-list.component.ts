import { Component, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { HelloComponent } from './hello.component';

@Component({
	selector: 'app-hello-list',
	template: `
	  <p>Projected content:</p>
    <div>
	    <ng-content></ng-content>
	  </div>
	  <button (click)="onClickAll()">
	    Randomize Hello colors
	   </button>
	  <button (click)="onClickLast()">
	    Randomize only last Hello color
	 </button>`
})
export class HelloListComponent {
  @ContentChildren(HelloComponent) helloChildren: QueryList<HelloComponent>;
  @ContentChild('last') lastChild: HelloComponent;

  constructor() {}
  ngAfterContentInit() {
    // Content children now set
    this.onClickAll();
  }

  onClickAll() {
    this.helloChildren.forEach(child => child.randomizeColor());
  }

  onClickLast() {
    this.lastChild.randomizeColor();
  }
}
