import {fromJS} from 'immutable';
import  {SKILL_UPDATED} from '../actions/people-actions';
const INITIAL_STATE = fromJS([
  {
    name: 'Elenor',
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

/*
Find the index of a person given their name
 */
let getPersonIndex = (state, personName) => {
  return 1;
}

/*
Find the index of the given skill name, for a person within
the collection
 */
let getSkillIndex = (state, personIndex, skillName) => {
    
    return 1;
}

let buildKeyPath = (state, { person, skillName }) => {
  const personIndex = getPersonIndex(state, person);
  const skillIndex = getSkillIndex(state, personIndex, skillName);  
  return [/* key path */]; 
}

export default function skillsReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
// Handle the SKILL_UPDATED action.
// hint: you will need to find the index of the person, and the skill 
// for that person to form a keyPath to be used with setIn

       default:
        return state;
    }
}
