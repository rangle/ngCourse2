import { Component } from 'angular2/core';
import { RangleSearchBar }  from './rangle-search-bar';

@Component({
  selector: 'app',
  directives: [ RangleSearchBar ],
  template: `<rangle-search-bar></rangle-search-bar>`
})
export class App {}
