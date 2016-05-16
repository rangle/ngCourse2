import {Component} from 'angular2/core';
import {Parent} from './parent';

@Component({
  selector: 'grand-parent',
  template:`<parent></parent>`,
  directives: [Parent]
})
export class GrandParent {}

ChangeDetectorRef
