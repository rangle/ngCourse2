import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import PersonsTopSkill from '../containers/persons-top-skill';
import PersonsBottomSkill from '../containers/persons-bottom-skill';
@Component({
  selector: 'person',
  templateUrl: 'app/components/person-tpl.html',
  directives: [NgClass, PersonsTopSkill, PersonsBottomSkill]
})
export default class PersonComponent {
  @Input() person: any;

}

