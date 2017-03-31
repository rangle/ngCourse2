# Creating Functional Forms

**Daniel Figueiredo and Renee Vrantsidis**

The architecture of a software system is a description of
how to decompose it into pieces,
how those pieces interact,
and how that decomposition enables and constrains further development.
In this chapter,
we will begin our exploration of the architecture of JavaScript applications
by looking at how to use ideas borrowed from pure functional programming
to simplify one of the most common tasks in web development:
form handling.
At first glance these two topics have nothing to do with each other,
but paradoxically,
acting as if the state of our system cannot be changed
actually makes its changes easier to manage.

## The Problem

You have probably built web applications that use forms.
They are easy enough to manage if you only have a few,
or a few dozen,
but manual approaches fall apart by the time you have
hundreds of distinct forms,
each of which can update the application's state in different ways.

Angular provides some good tools for building forms,
but these are not enough by themselves in very large programs.
In particular,
`NgForm` leaves state management entirely in the developer's hands,
which quickly results in unmanageable client-side complexity:
a modern single-page application (SPA) may have to keep track of
hundreds of pieces of information,
any of which may need to be updated based on the user's actions
*and* kept in sync with permanent storage on the server.

As if that wasn't complicated enough,
many of these interactions have to be done asynchronously
in order to keep the user's FQ (frustration quotient) down.
If,
for example,
a web page locks up for half a second every time the user types a single character
because it's fetching possible auto-completes from the server,
the user will quickly take her business somewhere else.

Our problem is therefore this:

> How should we manage client-side state in an asynchronous web application that uses forms?

Our solution is:

> Use Redux to represent state as a sequence of snapshots,
> each of which is created in response to a single action.

## Redux in a Hurry

Luckily for us,
people who use pure functional programming languages
have been thinking about these issues for more than 30 years,
and have developed some design patterns that we can use
in conventional languages like JavaScript.
A *pure functional* language is one in which data cannot be changed,
or *mutated*,
in place:
once a value is defined,
it is *immutable*.
Rather than changing its state,
a program written in a pure functional language creates an entirely new state
on which to operate.

This may seem wasteful:
after all,
if I want to paint one wall of a room,
I don't have to build an entirely new room
that is identical to the original except for the color of the wall in question.
However,
making state immutable has a lot of advantages when we are dealing with concurrency.
In particular,
systems are a lot easier to reason about and test if they can't change under our feet.
Pure functional programming therefore lets us substitute
a cheap, plentiful resource–computer time–for one which is much more expensive–human brain power.

> As we will see below,
> we can often avoid the need to copy all of the state.
> If we divide it into logically-separate chunks,
> we can re-use the chunks that *don't* change.
> In our experience,
> the amount of data that actually has to be duplicated
> will grow slowly with the size of the application
> so long as we think carefully about how to organize it.

The system we will use to illustrate this idea is [Redux][redux-site],
which is built on three architectural principles:

1.  There is a **single source of truth**,
    which in practice means that
    the entire state of the application is stored in a single object tree.
    A good rule of thumb is that this object tree must hold
    everything needed to restore the state of the system after shutdown and restart.
    Storing all this information in one place makes debugging a lot easier,
    and as we shall see,
    also simplifies implementation of things like undo/redo.

2.  **State is read-only**,
    i.e.,
    the object tree mentioned above is *never* modified in place.
    Instead,
    the only way to change the state is to create an *action* object
    that describes what change is desired.
    Button click handlers and I/O callbacks never update the state themselves,
    but rather create an action and queue it up to be handled sequentially.
    As a bonus,
    recording the state changes as objects makes replay, debugging, and testing
    a lot simpler.

3.  **Changes are made by pure functions.**
    Redux calls these functions *reducers*,
    since they reduce the combination of an existing state and an action
    to a new state.
    Reducers *never* have side effects:
    they do not modify global variables,
    write data to disk,
    or do anything else to change the world around them.
    This allows programmers to think about their effects one at a time,
    and makes it easy to combine and re-use them.

As a very short example,
suppose we want to implement a traffic light
that switches state between red, amber, and green.
The state is an object with a single field showing the current color of the light:

```js
let state = {color: 'red'};
```

and the reducer cycles between colors:

```js
function changeColor(state, action) {
  switch(action.type) {

  case 'NEXT':
    if (state.color == 'red')
      return {color: 'green'};
    else if (state.color == 'green')
      return {color: 'amber'};
    else if (state.color == 'amber')
      return {color: 'red'};

  default:
    return state;
  }
}
```

It's very important that `changeColor` returns the original state without modification
when it doesn't recognize the type of the action it is being asked to perform,
since this allows us to combine reducer functions
without worrying that they will trip over one another.
And to simplify our program,
we frequently fold the initialization of the state into the definition of the reducer
by defining the initial state as the default value for the reducer's first parameter:

```js
function changeColor(state = {color: 'red'}, action) {
  switch(action.type) {
    ...as before...
  }
}
```

Once this reducer is defined,
our application wraps it up to create an object store,
and then sends actions to that store to tell it when to move to the next state:

```js
import { createStore } from 'redux';
let store = createStore(changeColor);

for (let i=0; i<10; i++) {
  store.dispatch({type: 'NEXT'});
  console.log(store.getState().color); // red, green, amber, red, ...
}
```

If we want to add new capabilities,
we simply update our reducer:

```js
function changeColor(state, action) {
  switch(action.type) {

    case 'NEXT':
      ...as before...

    case 'EMERGENCY':
      return {color: 'red'};

    default:
      return state;
  }
}
```

This may seem like a lot of work to manage a single traffic light,
but that work pays off as soon as we have to worry about asynchronous updates.
For example,
if we want to do an emergency test of the light every night at 1:00 am,
all we have to do is this:

```js
let delay = until(tomorrow() + ONE_HOUR);
setTimeout(() => changeColor(state, {type: 'EMERGENCY'}), delay);
```

When the timeout callback is triggered,
Redux will put the traffic light in the required state
regardless of what else has gone on or is going on.

## Setting Up Forms to Work with Redux

As our running example,
we will build a set of forms that allow users to create a wizard for a role-playing game.
We created this example for [a talk][repo-talk] at [NG Conf 2017][ng-conf],
and the complete source is [available on GitHub][repo-application].

Our overall goals are to take advantage of Redux state management
to automatically store our form data in state as form values change,
and if possible to use one mechanism to manage all the forms in our application.
The first step is to plan the shape of our forms.
We can structure the store however we want,
but since we know that real applications evolve,
we will define things using TypeScript interfaces
rather than relying on specific concrete classes.
That will make it easier to swap things in and out for testing later on.
(It also encourages us to avoid using `this`,
which in turn encourages us to think more functionally.)

```ts
export interface IForm {
  character: ICharacter;        // our single top-level object (for now)
}

export interface ICharacter {
  name?: string;                // optional name
  bioSummary: IBioSummary;      // biographical information (see below)
  skills: string[];             // list of skills
}

export interface IBioSummary {
  age: number;                  // age in years
  alignment: string;            // good or bad, lawful or chaotic
  race: string;                 // character's species
}
```

These interfaces define the shape of a form in our Redux store,
which is the part of the store our reducer will be concerned with in this example.
Defining these interfaces does *not* actually create the store–we will do that in a moment–but
*does* specify the shape of the objects our reducers will hand back to us.

The form contains a single object representing a character,
rather than using the character itself as the store.
That way,
if we want to add other top-level items in future,
we won't need to reorganize existing material.
For example,
the next version of our application might have this structure:

```ts
export interface IForm {
  character: ICharacter;        // character info
  equipment: IEquipment;        // character's equipment
}
```

Equally,
if we want to add more forms,
we won't need to reorganize the existing material,
and we can re-use common actions that work for any form.

One consequence of this decision is that
every action should contain the path to the particular part of the state it applies to.
Agile purists might say that we shouldn't add this until we need it,
and if our application consisted of just a login form and a message of the day,
they'd be right.
However,
we have enough experience with applications of this kind to know that we're going to,
and adding that to our architecture from the start will save us re-work later.

Having decided on the structure of our store,
the next step is to define its initial state.
We will do this by creating a literal object that conforms to the `ICharacter` interface,
and another that conforms to the `IForm` interface:

```ts
const characterInitialState: ICharacter = {
  name: undefined,
  bioSummary: {
    age: undefined,
    size: undefined,
    alignment: undefined,
    race: undefined,
  },
  skills: []
};

const initialState: IForm = {
  character: characterInitialState
};
```

We could fold the definition of `characterInitialState` into `initialState`
to create one large literal object,
but again,
since we're likely to add more state information
(like the equipment the character is carrying),
we have decided that `initialState` will only ever be
a list of top-level objects conforming to separately-defined interfaces.

> We have defined our initial state in a file of its own
> to make it easier to find and update.
> In a real application,
> it would probably be created programmatically
> so that we could swap in something else for testing.
> Note that in real life, it would *not* come from a database:
> instead, it's the blank slate that would be updated from a database
> as the application is being bootstrapped.
> (And yes,
> that bootstrap process would be implemented as
> a series of update actions.)
> However the initial state is created,
> it should be as empty as possible.

Another early decision is that we will define functions to create actions,
and that each action will have two elements:
a string called `type` (which Redux requires),
and a sub-object called `payload` that will contain
the path to the part of the store it applies to
and whatever extra values are needed to update the state.
Redux doesn't mandate this,
but again,
experience teaches us that creating literal objects
in many different places throughout our program
is just as risky as using magic numbers
rather than defining a constant and referring to it.

> The name `type` is a requirement:
> Redux mandates it by exporting an `Action` interface defined as:
>
> ```ts
> interface Action { type: string }
> ```
>
> The name `payload` is not required, but is widely used and strongly encouraged,
> since in some cases we need to add extra info for our actions to be completed:
>
> ```ts
> interface PayloadAction extends Action { payload: any }
> ```

As an example of an action creation function,
here's one that saves a form's value:

```ts
const saveForm = (path, value) => ({
  type: 'SAVE_FORM',
  payload: {
    path: path,
    value: value
  }
});
```

Now that we know the shapes of our store and our action,
the first version of the reducer is easy to write.
To keep it short,
we rely on three helper functions from [Ramda][ramda-site],
a library of functional utilities for JavaScript:

*   `assocPath`: makes a shallow clone of an object,
    replacing the specified property with the specified value as it does so.
    (Think of this as "make me a copy of X, but with Y set to Z".)
*   `merge`: create a shallow copy of one object with properties merged in from a second object.
    (This is like `assocPath`, but using a second object to get multiple changes at once.)
*   `path`: retrieve the value at a specified location in a structured object.

(We could write replacements for these to avoid depending on Ramda,
but we prefer to leverage the work they've put into testing and performance optimization.)
With these helpers in hand,
our `formReducer` looks like this:

```ts
import { path, assocPath, merge } from 'ramda';

export function formReducer(state = initialState: IForm, action) {
  switch (action.type) {

  case 'SAVE_FORM':
     return assocPath(
       action.payload.path,
       merge(path(action.payload.path, state), action.payload.value),
       state
     );

  default:
    return state;
  }
}
```

There is actually less going on here than first appears.
Working from the outside in,
if the action's type is *not* `SAVE_FORM`,
then `formReducer` returns the original state without any changes.
This means that we can safely chain this reducer together
with others that handle other parts of our user interface:
as long as they all use distinct keys for their actions,
they will watch the state fly by without doing anything we don't want them to.

If the action does have the right type,
`formReducer` uses `path` to get the part of the state that needs to be updated,
then uses `merge` and `assocPath` to create a shallow copy of the state,
replacing that element,
*and only that element*,
with a different value.
The most important word in the previous sentence is "create":
at this point,
the state that was passed in is thrown away and a new one created.
Some parts of the old state are recycled–`assocPath` does a shallow clone–but
those are the parts that *weren't* changed,
and if other reducers do their jobs properly,
they will replace those parts rather than updating them in place
when it's their turn to act.

## Connecting the Dots

It's now time to turn our attention to the interface
that will trigger this state change
and reflect any changes to the state triggered by other interface components.
Since we're using Angular 2,
we will define a class
and use the `@Component` decorator to weld some metadata to it:

```ts
@Component({
  selector: 'character-form',
  template: require('./character-form.html')
})
export class CharacterForm {
  @ViewChild(NgForm) ngForm: NgForm;
  public characterForm: IForm;
  private formSubs;

  constructor(private ngRedux: NgRedux<IAppState>) {}
}
```

There's a lot going on here,
so we'll start with a high-level explanation and then dive into details.
As the diagram shows,
Angular will keep `ngForm` and `characterForm` in sync with each other
using its own dark magic,
which we will see in a moment.
In order to synchronize that with our state,
we create a standard observer/observable connection
to make `characterForm` watch the character portion of our Redux state.

![Redux Flow](../images/redux_flow_diagram.png)

Looking once more at the diagram,
there is a potential circularity in the updates.
Angular avoids an infinite loop by breaking the cycle
when `characterForm` and the form's actual internal data are the same.

Looking more closely at the code used to create all of this:

*   The `@Component` decorator in the code above tells Angular that
    this class is used to fill in `<character-form>` elements
    in the `character-form.html` template snippet.
*   Using the `@ViewChild` decorator on `ngForm`
    gives this class an instance variable that watches a form.
    We need this because we are going to subscribe to event notifications from that form
    later on.
*   The `characterForm` instance variable is our working copy of the form's state.
*   Finally, `private ngRedux: NgRedux<IAppState>` triggers Angular's dependency injection
    and gives us access to the Redux store.
    When our application is busy doing other things,
    our data will live in this store,
    and when we're testing,
    we can inject a mock object here to give us more insight.

> The `formSubs` instance variable is the odd one out in this class.
> Its job is to store the observer/observable subscription
> connecting our state to our form
> so that we can unsubscribe cleanly when this component is destroyed.
> Angular 2 will automatically unsubscribe on our behalf,
> but it's always safer to put our own toys away when we're done playing with them…

Since `CharacterForm` is an Angular component,
it needs a template to define how it will be rendered.
In keeping with Angular best practices,
we will use a template-driven form
and bind its inputs to objects retrieved from the Redux state.
The first part of that form looks like this:

```html
<form #form="ngForm">
  <label for="name">Character Name:</label>
  <input
    type="text"
    name="name"
    [(ngModel)]="characterForm.name">

  <label for="age">Age:</label>
  <input
    type="number"
    name="age"
    [(ngModel)]="characterForm.bioSummary.age">
</form>
```

`ngModel` is a magic word meaning "the value of this field in the form".
The expression `[(ngModel)]` therefore makes a form control
and binds it to the public data member of our form object.
The final step in wiring all of this together is therefore to subscribe to the Redux state
so that whenever it changes,
the changes are automatically pushed into the form
(which triggers a DOM update and a re-rendering of the page).
Equally,
since we're listening to the form for changes and writing those to our state
by creating and dispatching actions,
anything the user does will be reflected in the state.
The beauty of this is that if anyone else does an update anywhere,
everything will keep itself in sync.

> For the sake of simplicity we are synchronizing the whole form object in a single action,
> which sets the character attribute in the state with a brand new object every time.
> We could instead sync specific attributes to improve performance
> by using the `path` mechanism introduced earlier.

It's tempting to put this final piece of wiring in the constructor of our component,
but that doesn't work
because Angular has to construct several objects
before any of them can be wired together.
This is a key feature of Angular's architecture
(and of the architectures of many other systems):
object *construction* and object *initialization* are handled separately
to free us from headaches related to cyclic references.

The right place to connect everything is `ngOnInit`,
which is called after all the objects in the system have been created
but before any of them are used.
The `ngOnInit` for `CharacterForm` does the two pieces of wiring described above
in an arbitrary order:

```ts
ngOnInit() {

  // Subscribe to the form in state.
  this.formSubs = this.ngRedux.select(state => state.form.character)
    .subscribe(characterFormState => {
      this.characterForm = characterFormState;
    });

  // Dispatch an action when the form is changed.
  this.ngForm.valueChanges.debounceTime(0)
    .subscribe(change =>
      this.ngRedux.dispatch(
        saveForm(
          change,
          ['character']
        )
      )
    );
}
```

The first half of this method says that when the state changes,
we want to update the form.
We use `ngRedux.select` with a fat arrow function as callback
to pick out the character portion of the state,
then subscribe to that with a another fat arrow callback
that updates the form data
(which as explained above triggers redisplay).

The second half of `ngOnInit` does the binding in the opposite direction:
whenever the form changes,
we dispatch an action created by `saveForm`
that has `SAVE_FORM` as the change
and `['character']` as the path to the part of the state we want to modify.
`ngForm`'s `valueChanges` method automatically gives us a `change` value
that contains all of the form values.
These values arrive in a JavaScript object that mirrors the structure of the HTML,
which is exactly what we want
(because we defined the name attributes to get it).

And that's it:
every change to our form triggers creation of a new state,
and every change to our state triggered by anything else
is immediately reflected in our form.
We *aren't* saving the state to disk,
but that's best left to some kind of middleware
(which can be smart about only persisting the bits of state
that have actually changed between updates).

## Filling in the Gaps

The only meaningful way to assess an architectural decision is to ask
whether it makes things comprehensible today
and easy to change tomorrow.
Given all of the plumbing introduced above,
you might think that our architecture falls short on both counts,
but it turns out that it actually simplifies application evolution.
To see this,
let's have a look at how it helps us handle multi-valued forms,
which Angular doesn't support out of the box.

As the name suggests,
a multi-valued form is one that can have many values at once,
such as a multi-select dropdown list.
The natural way to store these values is in an array,
such as the one shown below for storing a character's skills:

```ts
character: {
  skills: ['Drinking', 'Knowing Things'],
}
```

The first step in adding support for multi-valued fields to our application
is to define actions that manipulate arrays–or more precisely,
to define functions that create actions that tell Redux
how to generate a new array from an old one:

```ts
const addIntoArray = (path, value) => ({
  type: 'ADD_INDEXED_FORM_VALUE',
  payload: { path, value }
});

const putInArray = (path, value, index) => ({
  type: 'UPDATE_INDEXED_FORM_VALUE',
  payload: { path, value, index }
});

const removeFromArray = (index, path) => ({
  type: 'REMOVE_INDEXED_FORM_VALUE',
  payload: { index, path }
});
```

There's nothing exciting going on here:
each function creates an action with a `type` (again, required by Redux)
and a `payload` (our own term).
To cut down on typing,
we make use of the fact that `{a, b}` is a shorthand for
`{a: a, b: b}`:

```js
let a = 'A';
let b = 'B';
let both = {a, b};
console.log(both);
```
```
{a: 'A', b: 'B'}
```

The payload of the action returned by `addIntoArray`
therefore has two keys called `path` and `value`,
which are in turn bound to whatever was passed in
for the parameters with the corresponding names.

Once we have these actions,
the next step is to update our reducer by adding the following case:

```ts
case 'ADD_INDEXED_FORM_VALUE':
  const lensForProp = lensPath(action.payload.path);
  const propValue = <any[]> view(lensForProp, state);
  return assocPath(
    action.payload.path,
    concat(propValue, [action.payload.value]),
    state
  );
```

Again,
we're using Ramda functions to create a new array of skills
given an old array and the thing we want to add:
`lensForProp` is the location of the skills array in our state,
`propValue` is its current value,
and `concat` wrapped up in `assocPath` gives us the old skills
with the new one appended.
The additions to handle updating and removing skills have a similar shape.

Extending our user interface is equally easy.
We start with a helper function that creates and dispatches the required action:

```ts
addSkill() {
  this.ngRedux.dispatch(addIntoArray({
    value: undefined,
    path: [ 'character', 'skills' ]
  }));
}
```

We have put this in the form component,
but neither Angular nor good design principles strictly require this:
we could have put it (and similar functions) in a file full of utilities.

Now that we have the functions we need,
we can write the HTML needed to put everything in front of the user:

```html
<label>Skills:</label>

<div *ngFor="let skillSlot of characterForm.skills; let i = index;">
  <select
    [value]="skillSlot"
    (change)="onSelectSkill($event, i)">
    <option *ngFor="let skill of skills" [value]="skill">
      {{ skill }}
    </option>
  </select>
  <button type="button" (click)="removeSkill(i)">Remove</button>
</div>

<button type="button" (click)="addSkill()">Add skill</button>
```

The last line of this HTML is the one that lets users add skills;
the rest is to handle skill display and removal.

## The Payoff: Validation

One way to see how these changes pays off is to look at validation,
and in particular at the way in which we can use *selectors* to compute data by composing functions,
and then use *memoization* to make state changes more efficient.

> For those who wish to be more precise,
> we should distinguish between selectors as a general concept
> and selectors as implemented by the `reselect` library that we're using.
> The memoization benefits come from `reselect`,
> but the general benefit of using a selector for validation is that
> you can derive the validity of your form from the data you already have
> without having to dispatch extra actions like `VALIDATE_FIELD`.

Selectors chain functions together
and pipe their return values into the last function in the chain.
In the simple code below,
the selector will return `form.character`:

```ts
const formStateSelector = (state: IAppState) => state.form;

const characterFormSelector = createSelector(
  formStateSelector,
  (form: IForm) => form.character
);
```

With that in hand,
let's write a validation function that checks that all required fields are present
and add it to our component:

```ts
export const isFormValid = createSelector(
  characterFormSelector,
  character => character.name
    && character.bioSummary.age
    && character.skills.length > 0
);

@select(isFormValidSelector)
isFormValid$: Observable<boolean>;
```

Now,
after selecting,
we can use `isFormValid$` with an asynchronous pipe in our template:

```ts
<button 
  [disabled]="!(isFormValid$ | async)"
  type="submit">
  Save
</button>
```

(The `$` on the end of `isFormValid$` is a naming convention used in the RxJS library and elsewhere meaning,
"This is an observable."
We don't have to use it,
but we find it helps make code easier to understand.)

We can now go ahead and create specific rules for specific fields of our form
using a helper function called `isBetweenNumber` that does exactly what you'd expect:

```ts
const humanAgeValid = isBetweenNumber(14, 40);
const elfAgeValid = isBetweenNumber(80, 800);
const tieflingAgeValid = isBetweenNumber(35, 53);

const bioSummarySelector = createSelector(
  characterFormSelector,
  ({bioSummary}: ICharacter) => bioSummary
);

const ageValidationSelector = createSelector(
  bioSummarySelector,
  (bioSummary: IBioSummary) => {
    switch (bioSummary.race) {
      case 'Human': return humanAgeValid;
      case 'Elf': return elfAgeValid;
      case 'Tiefling': return tieflingAgeValid;
    }
  }
);

export const isAgeValidSelector = createSelector(
  bioSummarySelector,
  ageValidationSelector,
  ({age}, isAgeValid) => isAgeValid(age)
);
```

Once we have a pile of validation rules for our fields,
we can chain those selectors together like this:

```ts
const isFormValidSelector = createSelector(
  isAgeValidSelector,
  isNameValidSelector,
  (ageValid, nameValid) => ageValid && nameValid
);
```

In larger applications,
we can and should go further
and make selectors out of reusable validation functions:

```ts
const maxStringLengthValidation = (value: string, max: number) =>
  value.length < max;

const minStringLengthValidation = (value: string, min: number) =>
  value.length > min;

const isNameValidSelector = createSelector(
  createFormFieldSelector(['character', 'name']),
  (name: string) => maxStringLengthValidation(name, 50)
    && minStringLengthValidation(name, 3)
);
```

We can make our application more user-friendly
by subscribing to the selectors we've made and using them in our template:

```ts
@select(isAgeValidSelector)
  isAgeValid$: Observable<boolean>;

@select(isNameValidSelector)
  isNameValid$: Observable<boolean>;
```

Since we have access to Angular's `FormControl` states,
we can use them to show error messages:

```ts
<input
  type="text"
  name="name"
  #nameField="ngModel"
  [(ngModel)]="characterForm.name">
<div
  [hidden]="isNameValid || nameField.control.pristine">
  Name must be between 3 and 50 characters
</div>
```

## Conclusion

One of the things that makes it hard to discuss software architecture is that
the solutions to big problems inevitably look like overkill when applied to small ones.
If all we ever wanted to do was manage the names, ages, and skill sets of wizards,
and if the entire application was only ever going to be maintained by its original author,
we wouldn't want or need all of the machinery introduced above.
However,
these assumptions all too easily become self-fulfilling prophecies.
If we don't architect our software to accommodate both expansion of function
and expansion of the development team,
both will be so painful that we won't do them.

Our experience is that
combining Angular 2 forms with Redux for state management
pays off sooner than you would think.
Testing is a lot easier when all checks on changes to an application's state
can be written as before-and-after rules.
(To see how much easier, compare the [Redux testing examples][redux-test] to whatever you're doing now.)
Just as importantly,
a single reducer can often be used for many forms,
and generic actions can be re-used as well.
For example,
most of what we wrote above to handle character skills
can be used to keep track of how many potions and scrolls they are carrying as well.

Of course,
nothing is ever free.
In large applications,
it's important to design the structure of the Redux store
so that new instances of it can be created quickly,
and so that the next programmer to inherit the application can easily figure out
which parts of the state to update when.
We are also still learning how best to co-design reusable parts of forms and reusable parts of state
so that reducers can be packaged and re-used as black boxes.
Just as careful design of state makes the computer more efficient,
careful co-design of components will,
we hope,
allow programmers to be more efficient.
If you would like to share your experiences with this,
we'd enjoy hearing from you.

[ng-conf]: https://www.ng-conf.org/
[ramda-site]: http://ramdajs.com/
[redux-site]: http://redux.js.org/
[redux-test]: http://redux.js.org/docs/recipes/WritingTests.html
[repo-application]: https://github.com/danielfigueiredo/wizards-wizard
[repo-talk]: https://github.com/renvrant/formcontrol-freaks
