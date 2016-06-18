import { Component, Input } from '@angular/core';

@Component({
  selector: 'skill',
  template: '<span>{{ skill.name }} - {{ skill.level }}</span>'
})
export class Skill {
  @Input() skill: any;
}
