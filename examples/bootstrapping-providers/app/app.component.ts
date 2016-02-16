import {Component} from 'angular2/core';
import {MyProvider} from './myprovider';

@Component({
	selector: 'app-root',
	template: '<b>Bootstrapping an Angular 2 application!</b>'
})
export class AppComponent {
  constructor(myProvider:MyProvider) {
  }
}