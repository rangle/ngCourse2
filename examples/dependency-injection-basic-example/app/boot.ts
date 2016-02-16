import {bootstrap} from 'angular2/platform/browser';
import {App} from './containers/app';
import {Hamburger, Bun, Patty, Toppings} from './services/index';

bootstrap(App, [Hamburger, Bun, Patty, Toppings]);
