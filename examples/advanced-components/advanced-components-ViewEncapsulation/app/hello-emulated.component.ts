import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'hello-emulated',
	template: '<p class="hello"><code>Emulated / .hello:</code> Hello World</p>',
	encapsulation: ViewEncapsulation.Emulated,
	styles: [`
    .hello { color: green; }
	`]
})
export class HelloEmulated {
  name: string;
  constructor() {
    this.name = 'World';
  }
}
