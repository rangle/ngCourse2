import {Component} from 'angular2/core';
import {GreatGrandParent} from './components/great-grand-parent';

const props = {
};

@Component({
	selector: 'app',
	template: '<great-grand-parent></great-grand-parent>',
	directives: [GreatGrandParent]
})
export class App {
  constructor() { }
}
