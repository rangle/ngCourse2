# 1.0 Redux

This is an application using Angular2 + ng2-redux, this application is meant to demonstrate

* Connecting to application state using ng2-redux's 'Select pattern'
* Dispatching actions with the ActionCreatorService pattern
* Illustrating the distinction between container and presentational components

# To be completed:

* Complete _*app/components/skill-label.ts*_
* Implement the updateSkill action in _*app/actions/people-actions.ts*_
* Complete _*app/containers/persons-bottom-skill.ts*_
* Complete _*app/containers/persons-top-skill.ts*_
* Complete the _*app/components/person.ts*_ to make use of the top and bottom skill containers

* Complete the implementation of _*app/reducers/people-reducer*_
  * Handle the action type `SKILL_UPDATED`
  * Complete the methods needed to form a keyPath
  * Resource: [Immutable List Documentation](https://facebook.github.io/immutable-js/docs/#/List/setIn)

# Expected Results

* List each user in the application state
* Display they're top and bottom skills
* Display a list of their skills with a star rating next to it
* Clicking on a rating should update the person's information
* The top and bottom skill component should reflect any updates to the data
