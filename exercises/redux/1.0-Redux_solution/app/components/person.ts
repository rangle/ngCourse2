import { Component, Input } from '@angular/core';
import { Skill } from './skill';
import { SkillTable } from './skill-table';

@Component({
  selector: 'person',
  directives: [ Skill, SkillTable ],
  template: `
    <div>Name: {{ person.name }}</div>
    <div>Top Skill:
      <skill [skill]="getTopSkill()">
      </skill>
    </div>
    <div>Bottom Skill:
      <skill [skill]="getBottomSkill()">
      </skill>
    </div>

    <skill-table [skills]="person.skills">
    </skill-table>
  `,
    styles: [`
    :host {
      border: solid black 1px;
      display: block;
      margin: 5px;
      padding: 5px;
    }

    skill-table {
      margin-top: 5px;
    }
  `]
})
export class Person {
  @Input() person: Object;

  getTopSkill() {
    return this.person.skills.reduce((top, p) => {
      return (top.level > p.level) ? top : p;
    });
  }

  getBottomSkill() {
    return this.person.skills.reduce((bottom, p) => {
      return (bottom.level < p.level) ? bottom : p;
    });
  }
}
