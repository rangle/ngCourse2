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
  selector: 'persons-top-skill',
  directives: [SkillLabel],
  template: `
    <skill-label [skillName]="skillName" [skillLevel]="skillLevel"></skill-label>
  `
})

export default class PersonsTopSkill implements OnDestroy, OnInit {
  @Input() name: string;
  private _disconnect: Function;

  constructor(@Inject('ngRedux') private _ngRedux) {

  }

  ngOnInit() {
    // TODO: Complete
  }


  findTopSkill(collection, name) {
   // TODO: Complete
      
  }

  mapStateToTarget = (state) => {
    // TODO: Complete
    return { }
  }



  ngOnDestroy() {
    this._disconnect()
  }


}
