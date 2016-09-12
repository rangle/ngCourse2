import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'app',
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
