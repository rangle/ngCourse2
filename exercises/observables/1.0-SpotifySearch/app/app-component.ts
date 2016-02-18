import {Component} from 'angular2/core';
import ArtistSearch from './artist-search';

@Component({
  selector: 'ngc-app',
  template: `
<div class="p3">
  <ngc-artist-search></ngc-artist-search>
</div>`,
  directives: [ArtistSearch]
})
export default class App {
}
