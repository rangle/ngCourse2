import {ViewEncapsulation, Component} from 'angular2/core';

@Component({
	selector: 'hello-def',
	template: '<p class="hello"><code>Emulated / .hello:</code> Hello World</p>',
	encapsulation: ViewEncapsulation.Emulated,
	styles: [`
    .hello { color: green; }	  
	`]
})
class HelloDef {
  name: string;
  constructor() {
    this.name = 'World';
  }
}

@Component({
	selector: 'hello-native',
	template: '<p class="hello"><code>Native / .hello:</code> Hello World</p>',
	encapsulation: ViewEncapsulation.Native,
})
class HelloNative {
  name: string;
  constructor() {
    this.name = 'World';
  }
}

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
class HelloNone {
  name: string;
  constructor() {
    this.name = 'World';
  }
}

@Component({
	selector: 'app',
	directives: [HelloDef, HelloNative, HelloNone],
	template: `
	  <hello-def></hello-def>
    <hello-native></hello-native>
    <hello-none></hello-none>
	`
})
export default class App {
  name: string;
  constructor() {
    this.name = 'World';
  }
}
