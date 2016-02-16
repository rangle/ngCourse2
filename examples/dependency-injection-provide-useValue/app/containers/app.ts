import {Component, Inject, provide} from 'angular2/core';
import {Hamburger} from '../services/hamburger';

@Component({
  selector: 'app',
  template: `Random: {{ value }}`
})
export class App {
  value: number;
  constructor(@Inject('Random') r) {
    this.value = r;
  }
}
