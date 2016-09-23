import {Component, Input} from '@angular/core';

@Component({
  selector: 'for-example',
  template: `
    <div>
      <ng-content></ng-content>
      directed by {{episode.director}}
    </div>
  `,
  styles: [`
    :host.odd {
      display: block;
      background-color: #eee;
    }
  `]
})
export class ForExampleComponent {
  @Input() episode;
  
  ngOnInit() {
    console.log('component created', this.episode)
  }
  ngOnDestroy() {
    console.log('destroying component', this.episode)
  }
}