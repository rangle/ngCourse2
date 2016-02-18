import {Component} from 'angular2/core';
import {Control, ControlGroup, FormBuilder} from 'angular2/common';
import SearchService from './search-service';
import Artist from './artist';
import 'rxjs/Rx';

@Component({
  selector: 'ngc-artist-search',
  template: `
<form class="mb4" [ngFormModel]="searchForm">
  <label class="bold caps">Query</label>
  <input type="text" class="block col-12 field"
    ngControl="search"
    placeholder="Search Spotify for an artist">
</form>

<ngc-artist *ngFor="#artist of artists"
  [artist]="artist">
</ngc-artist>
`,
  directives: [Artist]
})
export default class ArtistSearch {
  searchField: Control;
  searchForm: ControlGroup;
  artists: Array<any>;

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder
  ) {
    this.searchField = new Control();
    this.searchForm = fb.group({ search: this.searchField });

    // this.searchField.valueChanges
  }
}
