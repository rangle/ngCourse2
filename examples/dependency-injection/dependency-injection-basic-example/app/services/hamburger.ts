import {Injectable} from '@angular/core';
import {Bun} from './bun';
import {Patty} from './patty';
import {Toppings} from './toppings';

@Injectable()
export class Hamburger {
  constructor(public bun: Bun, public patty: Patty, public toppings: Toppings) {
  }
}
