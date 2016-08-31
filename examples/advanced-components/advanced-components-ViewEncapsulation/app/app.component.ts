import {Component, ViewEncapsulation} from '@angular/core';
import {HelloEmulated} from './hello-emulated.component';
import {HelloNative} from './hello-native.component';
import {HelloNone} from './hello-none.component';

@Component({
	selector: 'app',
	directives: [
	  HelloEmulated,
	  HelloNative,
	  HelloNone
  ],
	template: `
	  <hello-emulated></hello-emulated>
    <hello-native></hello-native>
    <hello-none></hello-none>
	`
})
export class App {
  name: string;
  constructor() {
    this.name = 'World';
  }
}
