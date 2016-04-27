import { Component } from 'angular2/core';
import { RangleBar }  from './rangle-bar';
import { RangleButton } from './rangle-button';
import { RangleTextField } from './rangle-text-field';

@Component({
  selector: 'app',
  directives: [ RangleBar, RangleTextField, RangleButton ],
  template: `
    <rangle-bar name="Search the site">
      <rangle-text-field placeholder="Enter Keyword"
        [(value)]="searchTerm">
      </rangle-text-field>
      <rangle-button name="Search"
        [isPrimary]="true"
        (click)="handleSearch(searchTerm)">
      </rangle-button>
    </rangle-bar>

    <rangle-bar name="Other Stuff">
      <rangle-button name="Button 1"
        [isPrimary]="true">
      </rangle-button>
      <rangle-button name="Button 2"></rangle-button>
      <rangle-button name="Button 3"></rangle-button>
    </rangle-bar>
  `
})
export class App {
  private searchTerm: string;

  handleSearch(searchTerm: string): void {
    alert(`You searched for '${searchTerm}'`);
  }
}
