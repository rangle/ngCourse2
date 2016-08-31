import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'hello-native',
	template: '<p class="hello"><code>Native / .hello:</code> Hello World</p>',
	encapsulation: ViewEncapsulation.Native,
})
export class HelloNative {
  name: string;
  constructor() {
    this.name = 'World';
  }
}
