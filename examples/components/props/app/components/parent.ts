import {Component} from 'angular2/core';
import {Child} from './child';

@Component({
  selector: 'parent',
  template:`<child></child>`,
  directives: [Child]
})
export class Parent {}
