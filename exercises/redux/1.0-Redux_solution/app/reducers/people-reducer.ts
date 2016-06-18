import { Map, fromJS } from 'immutable';
import { SKILL_UPDATED } from '../actions/people-actions';

const INITIAL_STATE = fromJS([
  {
    name: 'Eleanor',
    skills: [{name: 'JavaScript', level: 4 },
      { name: 'HTML', level: 3 },
      { name: 'CSS', level: 2 },
      { name: 'TDD', level: 3 }]
  },
  {
    name: 'James',
    skills: [{name: 'JavaScript', level: 2},
      { name: 'HTML', level: 5 },
      { name: 'CSS', level: 4 },
      { name: 'TDD', level: 1 }]
  },
   {
    name: 'Alex',
    skills: [{name: 'JavaScript', level: 5 },
      { name: 'HTML', level: 3 },
      { name: 'CSS', level: 2 },
      { name: 'TDD', level: 4 }]
  }
])

let getPersonIndex = (state, personName) => {
  return state.findIndex(n=>n.get('name') === personName)
}

let getSkillIndex = (state, personIndex, skillName) => {
  return state
    .getIn([personIndex,'skills'])
    .findIndex(n=>n.get('name') === skillName);
}

let buildKeyPath = (state, { person, skillName }) => {
  const personIndex = getPersonIndex(state, person);
  const skillIndex = getSkillIndex(state,personIndex, skillName);
  return [personIndex,'skills',skillIndex,'level'];
}

export default function skillsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case SKILL_UPDATED:
      const keyPath = buildKeyPath(state, action.payload);
      return state.setIn(keyPath, action.payload.skillLevel);
   default:
      return state;
  }
}
