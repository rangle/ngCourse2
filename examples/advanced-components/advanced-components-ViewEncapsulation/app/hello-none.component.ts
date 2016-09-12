import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'hello-none',
	template: '<p class="hello other-hello"><code>None / .other-hello:</code> Hello World</p>',
	encapsulation: ViewEncapsulation.None,
	styles: [`
    .other-hello {
      color: white;
      background-color: gray;
      padding: 5px;
    }
	`]
})
export class HelloNone {
  name: string;
  constructor() {
    this.name = 'World';
  }
}
