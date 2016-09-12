import {Component, Input} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {Actor} from './actor.model';

@Component({
  selector: 'movie',
  styles: ['div {border: 1px solid black}'],
  template: `
    <div>
      <h3>{{ title }}</h3>
      <p>
        <label>Actor:</label>
        <span>{{actor.firstName}} {{actor.lastName}}</span>
      </p>
    </div>`,
  changeDetection: ChangeDetectionStrategy.Default
})
export class MovieComponent {
  @Input() title: string;
  @Input() actor: Actor;
}
