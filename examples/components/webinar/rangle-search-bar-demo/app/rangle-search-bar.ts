import { Component, Output, EventEmitter } from 'angular2/core';
import { RangleButton } from './rangle-button';
import { RangleLabel } from './rangle-label';
import { RangleTextField } from './rangle-text-field';

@Component({
  selector: 'rangle-search-bar',
  directives: [ RangleLabel, RangleButton, RangleTextField ],
  templateUrl: 'app/rangle-search-bar.html',
  styleUrls: [ 'app/rangle-search-bar.css' ]
})
export class RangleSearchBar {
  private inputValue: string;

  handleSearch() {
    alert(`You searched for '${this.inputValue}'`);
  }
}
