# 1.0 Redux

This is an application using Angular2 + ng2-redux, this application is meant to demonstrate

* Using mapping application state to target, and doing data transformation
* Hooking up action creators
* Illustrating the distinction between containers and dumb components


# To be completed:

* Complete _*app/compoentns/skill-label.ts*_ 
* Implement the updateSkill action in _*app/actions/people-actions.ts*_
* Complete _*app/containers/persons-bottom-skill.ts*_
* Complete _*app/containers/persons-top-skill.ts*_
* Complete the _*app/components/person.ts*_ to make use of the top and bottom skill containers 

* Complete the implementation of _*app/reducers/people-reducer*_
  * Handle the action type `SKILL_UPDATED`
  * Complete the methods needed to form a keyPath
  * Resource: [Immutable List Documentation](https://facebook.github.io/immutable-js/docs/#/List/setIn)

# Expected Results

* Each person should be displayed
* Each person should have their highest, and lowest ranked skill displayed
* Each person should have a list of skills listed under their name
* Each skill should have a star ranking next to it
* Clicking on the ranking should update the persons skill
* The top and bottom skill component should reflect the updates


