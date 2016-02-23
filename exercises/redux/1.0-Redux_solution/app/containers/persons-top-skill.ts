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
    this._disconnect = this._ngRedux.connect(
      this.mapStateToTarget)(this)
  }


  findTopSkill(collection, name) {
    return collection
      .find(n => n.get('name') === name)
      .get('skills')
      .maxBy(n=>n.get('level'))
      
  }

  mapStateToTarget = (state) => {
    let topSkill = this.findTopSkill(state.people, this.name);
    
    return {
      skillName: topSkill.get('name'),
      skillLevel: topSkill.get('level')

    }
  }

  ngOnDestroy() {
    this._disconnect()
  }

}
