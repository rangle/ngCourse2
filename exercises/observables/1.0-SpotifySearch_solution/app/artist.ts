import {Component} from 'angular2/core';

@Component({
  selector: 'ngc-artist',
  template: `
<div class="flex flex-center border-bottom py1">

  <div class="overflow-hidden mr2 flex flex-center"
    [ngStyle]="{ width: '64px', height: '64px' }">
    <img class="flex-none"
      [src]="artist.image" />
  </div>

  <div class="flex-auto flex">
    <p class="m0 flex-auto">{{ artist.name }}</p>
    <p class="m0 gray">{{ artist.popularity }}</p>
  </div>

</div>
`,
  inputs: ['artist']
})
export default class Artist {
}
