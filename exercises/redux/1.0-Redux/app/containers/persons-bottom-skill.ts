import {
  Component,
  View,
  Inject,
  OnDestroy,
  OnInit,
  Input
} from 'angular2/core';
import SkillLabel from '../components/skill-label';

@Component({
  selector: 'persons-bottom-skill',
  directives: [SkillLabel],
  template: `
    <skill-label [skillName]="skillName" [skillLevel]="skillLevel"></skill-label>
  `
})

export default class PersonsBottomSkill implements OnDestroy, OnInit {
  @Input() name: string;
  private _disconnect: Function;

  constructor(@Inject('ngRedux') private _ngRedux) {

  }

  ngOnInit() {
     // TODO: setup ngRedux 
  }


  findBottomSkill(collection, name) {
    // TODO: Return the skill with the lowest value information
    // the collection, if more than 1 skill has the same value,
    // only return one item. 
      
  }

  mapStateToTarget = (state) => {
    
    return {
      skillName: 'TBC - lowest skill'
      skillLevel: 0
    }
  }



  ngOnDestroy() {
    this._disconnect()
  }


}
