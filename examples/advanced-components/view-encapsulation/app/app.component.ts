import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	  <div class="hello">Hello World</div>
	  <app-hello-emulated></app-hello-emulated>
    <app-hello-native></app-hello-native>
    <app-hello-none></app-hello-none>
	`,
	// encapsulation: ViewEncapsulation.Emulated // default
	styles: [`
	  .hello { text-decoration: underline; }
	`]
})
export class AppComponent {
  name = 'World';
}
