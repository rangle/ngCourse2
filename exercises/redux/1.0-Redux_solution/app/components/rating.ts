import { Component, Input } from '@angular/core';
import R from 'ramda';

@Component({
  selector: 'rating',
  template: `
    <span
      class="star"
      [ngClass]="{ selected: isSelected(star) }"
      *ngFor="let star of getRange()">
    &#x2605;
    </span>
  `,
  styles: [`
    .star { font-size: 1.5rem; }
    .selected { color: gold; }

    .star:hover {
      cursor: pointer;
      color: darkgoldenrod;
    }
  `]
})
export class Rating {
  @Input() level: number;
  @Input() max: number;

  getRange() {
    return R.range(1, this.max+1);
  }

  isSelected(star) {
    return star <= this.level;
  }
}
