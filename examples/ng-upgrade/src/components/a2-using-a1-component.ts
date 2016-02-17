import {Component} from 'angular2/core';
import {upgradeAdapter, a1Upgradable} from '../upgrade-adapter';


@Component({
  selector: 'a2-using-a1',
  directives: [a1Upgradable],
  template: `<p>{{ message }}<a1-upgradable></a1-upgradable></p>`
})
export class A2UsingA1Component {
  message = 'Angular 2 Using Angular 1: ';
}