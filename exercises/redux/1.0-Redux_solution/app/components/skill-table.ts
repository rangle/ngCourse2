import { Component, Input } from '@angular/core';
import { Rating } from './rating';

@Component({
  selector: 'skill-table',
  directives: [ Rating ],
  template: `
    <div
      class="row"
      *ngFor="let skill of skills">
      <div class="label">{{ skill.name }}</div>
      <rating [level]="skill.level" [max]="5"></rating>
    </div>
  `,
  styles: [`
    :host {
      border-top: solid gray 1px;
      display: block;
    }

    .row {
      display: flex;
      align-items: center;
    }

    .label {
      width: 25%;
    }

    rating {
      width: 75%;
    }
  `]
})
export class SkillTable {
  @Input() skills;
}
