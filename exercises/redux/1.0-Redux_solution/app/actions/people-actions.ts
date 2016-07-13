import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const SKILL_UPDATED = 'SKILL_UPDATED';

@Injectable()
export class PeopleActions {
  constructor(private redux: NgRedux<any>) {}

  updateSkill(person, skillName, skillLevel) {
    this.redux.dispatch({
      type: SKILL_UPDATED,
      payload: { person, skillName, skillLevel}
    });
  }
};
