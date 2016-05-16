
import {Component} from 'angular2/core';
import {GrandParent} from './grand-parent';

@Component({
  selector: 'great-grand-parent',
  template:`<grand-parent></grand-parent>`,
  directives: [GrandParent]
})
export class GreatGrandParent {}
