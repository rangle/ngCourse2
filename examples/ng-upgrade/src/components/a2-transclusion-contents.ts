import {Component} from 'angular2/core';

@Component ({
  selector: 'a2-transclusion-contents',
  template: `<p>{{ message }}</p>`
})
export class A2Transclusion {
  message =
    'I am an Angular 2 Component "transcluded" into Angular 1.x';
}