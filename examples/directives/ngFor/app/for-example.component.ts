import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-for-example',
  template: `
    <div>
      <ng-content></ng-content>
      directed by {{episode.director}}
    </div>
  `
})
export class ForExampleComponent {
  @Input() episode: number;
}