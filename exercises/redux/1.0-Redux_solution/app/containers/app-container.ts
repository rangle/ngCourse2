import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import SkillRating from '../components/skill-rating';
import Person from '../components/person';
import * as R from 'Ramda';
import {bindActionCreators} from 'redux';
import peopleActions from '../actions/people-actions';

@Component({
  selector: 'simple-redux',
  directives: [SkillRating, Person]
  templateUrl: 'app/containers/app-tpl.html'
})
export class SimpleRedux implements OnDestroy, OnInit{
  
  private _disconnect: Function;
  constructor( @Inject('ngRedux') private _ngRedux) {

  }

  ngOnInit() {
    this._disconnect = this._ngRedux.connect(
      this.mapStateToTarget,
      this.mapDispatchToTarget)(this)
  }

 

  mapStateToTarget = (state) => {   
   return {
      people: state.people
    }
  }

  mapDispatchToTarget = (dispatch) => {
    return bindActionCreators(peopleActions, dispatch)
  }

  ngOnDestroy() {
    this._disconnect()
  }

  onSkillUpdated(name, { skill, rating }) {
    this.updateSkill(name, skill, rating );
  }

}




