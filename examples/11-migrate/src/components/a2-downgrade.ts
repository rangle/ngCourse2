import {Component} from 'angular2/core';

@Component({
  selector: 'a2-downgrade',
  template: '<p>{{ message }}</p>'
})
export class A2DowngradeComponent {
  message = `I am an Angular 2 component running in Angular 1.x`;
}