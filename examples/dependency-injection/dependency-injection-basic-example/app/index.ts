import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app.component.ts';
import {Hamburger, Bun, Patty, Toppings} from './services/index';

bootstrap(App, [Hamburger, Bun, Patty, Toppings]);