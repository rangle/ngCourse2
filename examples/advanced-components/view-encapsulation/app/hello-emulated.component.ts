import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-hello-emulated',
	template: `
	  <p class="hello">
	    <code>Emulated / .hello:</code>
      Hello World
    </p>`,
	styles: [`
    .hello { color: green; }	  
	`],
	encapsulation: ViewEncapsulation.Emulated
})
export class HelloEmulatedComponent {
  name = 'World';
}