import {Component, Input} from 'angular2/core';


@Component({
  selector: 'skill-label',
  template: `
  <span>
    {{skillName}} - {{skillLevel}}
  </span>`
})
export default class SkillLabel {
  @Input() skillName: string;
  @Input() skillLevel: number;

}

