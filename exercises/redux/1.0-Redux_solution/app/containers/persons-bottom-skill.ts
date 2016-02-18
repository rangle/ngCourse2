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
    this._disconnect = this._ngRedux.connect(
      this.mapStateToTarget)(this)
  }


  findBottomSkill(collection, name) {
    return collection
      .find(n => n.get('name') === name)
      .get('skills')
      .minBy(n=>n.get('level'))
      
  }

  mapStateToTarget = (state) => {
    let bottomSkill = this.findBottomSkill(state.people, this.name);
    
    return {
      skillName: bottomSkill.get('name'),
      skillLevel: bottomSkill.get('level')

    }
  }



  ngOnDestroy() {
    this._disconnect()
  }


}
