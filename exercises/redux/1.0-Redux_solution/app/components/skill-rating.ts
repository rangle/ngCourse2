import {Component, Input, EventEmitter, Output} from 'angular2/core';
import Rating from './rating';

@Component({
  selector: '[skillRating]',
  templateUrl: 'app/components/skill-rating-tpl.html',
  directives: [Rating]
})
export default class SkillRating {
  @Input() skillName; string;
  @Input() skillLevel: number;
  @Input() updateSkill;
  @Output() skillUpdated: EventEmitter = new EventEmitter();
  
  onRatingUpdated(rating, skill) {
    this.skillUpdated.emit({rating, skill});
  }
}

