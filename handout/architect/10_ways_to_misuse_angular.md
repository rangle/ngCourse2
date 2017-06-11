# Ten Ways to Misuse Angular

Any chainsaw that can cut down a tree can also take off a leg if used carelessly.
Equally,
any framework as powerful as Angular will inevitably contain traps for the unwary.
In this chapter,
we look at ways in which Angular is sometimes mis-used
and what developers should do instead.

## 1. Ignoring a Component's Host Element

When creating Angular components we should use the host element as a wrapper
instead of creating our own wrapper elements.
For example,
the card component below creates a heading and a paragraph.
We need a wrapper element in order to control their layout;
it's tempting to wrap them in a `<div>`,
but that is not required
because Angular will render the combination with a `<my-card>` wrapper element.
This is called a *host element*.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-card',
  template: `
  <h1 class="card-title">{{ title }}</h1>
  <p class="card-body">
    <ng-content></ng-content>
  </p>
  `
})

export class CardComponent { title = 'Title of card'; }
```

We can style the host element by targeting it with the `:host` selector in the component's CSS file.
Alternatively,
we can attach CSS classes to it using [host metadata](https://angular.io/docs/ts/latest/cookbook/ts-to-js.html#!#host-metadata).

```ts
@Component({
  selector: 'my-card',
  host: { class: 'db ma0 lh-title' },
  ...
})

export class CardComponent { title = 'Title of card'; }
```

Host metadata allows us to bind to all properties and events of the host element.
but so do the `@HostBinding` and `@HostListener` decorators.
However,
there are some subtle differences between the two.
Consider the following scenario:

```ts
@Component({
  selector: 'my-foo',
  host: { 'class': 'navy' },
})

export class FooComponent {}

@Component({
  selector: 'my-bar',
})

export class BarComponent {
  @HostBinding('class') className = 'navy';
}
```

Somewhere later in our application, we use them like this:

```html
<my-foo class="underline"></my-foo>
<my-bar class="underline"></my-bar>
```

`<my-foo>` will render with `class="underline navy"`,
but `<my-bar>` will render with `class="navy"` alone.
This happens because `@HostBinding` only supports binding of values,
while host metadata supports both binding and static values.
Since we are using a static value in this case,
Angular merges what we have defined in the metadata with what is defined on the component.
If we had bound the class to a component property instead,
the two examples would behave the same way:

```ts
@Component({
  selector: 'my-foo',
  host: { '[class]': 'className' },
})

export class FooComponent {
  className = 'navy';
}
```

## 2. Avoiding Observables

Angular exposes HTTP requests, form events, route params, and many other things as observables
because they are a flexible, maintainable way to manage interactions between different pieces of code.
When working with Angular,
we should use observables as much as possible,
both because of their intrinsic merits
and because architectural consistency makes code easier to understand.

We can leverage observable operators to compute data based on application state.
This allows us to reduce the amount of state we need to maintain,
and since they are pure functions,
they make our software easier to test.
In particular,
these operators can be used to select slices out of state data,
and can easily be *memoized* to improve performance.

Observables and data slicing can be adopted regardless of whether we use ngrx,
angular-redux
or bare services to manage state.
When working with Angular services,
for example,
we can replicate a Redux store-style API using `BehaviorSubject`.
The example below shows how to do this for a `TodoStore` service
that exposes the entire data store as a single `state$` observables.
To display a list of filtered items
we simply `map` over the state$` observable
instead of maintaining a separate list:

```ts
enum Filter { ALL, ACTIVE, COMPLETED }

interface ITodoStore {
  filter: Filter;
  todos: ITodo[];
}

@Injectable()
export class TodoStore {

  private stateSubject$: BehaviorSubject<ITodoStore> = new BehaviorSubject({
    filter: Filter.ALL,
    todos: [],
  });

  public readonly state$: Observable<ITodoStore> = this.stateSubject$.asObservable();

  constructor(private apiService: ApiService) {
    this.initialize();
  }

  initialize() {
    this.apiService.get('/todos')
      .subscribe(users => {
        this.stateSubject$.next(
          Object.assign({}, this.stateSubject$.getValue(), { users })
        );
      });
  }

  filterTodoByType(todo, filterType) {
    if (filterType === Filter.ALL) {
      return true;
    } else if (filterType === Filter.COMPLETED) {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  }

  filteredTodos$() {
    return this.state$.map(({ filter, todos }) =>
      todos.filter(todo => this.filterTodoByType(todo, filter));
  }
}
```

Observables also allow us to merge multiple streams to implement complex workflows
such as a [debounced search which ignores stale requests](https://angular-2-training-book.rangle.io/handout/http/search_with_flatmap.html).
Again,
by making these operations purely functional instead of maintaining separate state,
we can make our application much easier to test.

To access a data property,
we should use operators such as `map` or `pluck` to derive separate streams.
This allows us to utilize the `async` pipe in our templates
to ensure that rendering happens once data is available,
which in turn removes the need for managing subscriptions in component classes.
If multiple properties need to be accesssed in order to render a component,
subscribing to the base observable is likely a better option.
However,
this is often also a sign that the code should be refactored
so that each component is only coupled to a small slice of the application's state.
And keep in mind that just as promises beget promises,
observables beget observables:
any operators or transformations that occurred in a base observable
are passed on to any subsequent "child" or "branch" observables.

## 3. Using the Raw `Http` Service

Angular provides an `Http` service,
but we should always create a wrapper around it
instead of consuming it directly in our applications
so that we can create a layered architecture for consuming RESTful APIs.
The wrapper service---let's call it `ApiService`---acts as the base for all other operations,
and is where we can put common operations
like mapping each request to call `res.json()`.
It provides a centralized location for error handling,
logging,
attaching authentication tokens,
and other middleware operations.

The next layer up is then domain-specific services,
commonly having names like `UserService`, `PostsService`, or `CommentsService`.
These services use `ApiService`,
and *only* `ApiService`,
to make HTTP requests.
This makes testing easier,
since it means we only have to mock out `ApiService`
rather than mocking HTTP responses.

These higher-level services are also the perfect place to implement data transformations.
Our application will usually not directly consume the data returned by the API,
but will instead normalize and reshape it into something better for managing state.
[normalizr](https://github.com/paularmstrong/normalizr) is a useful tool for this task,
but many others can be used.

## 4. Not Considering the Injector Tree when Lazy Loading Modules

Angular has a hierarchical dependency injection (DI) system:
its tree of injectors parallels the application's component tree,
and when a component needs something,
Angular walks up the tree to find the injectable that mostly closely fits the request.

That's the good news.
The not-so-good news is that lazy loaded modules create their own branch in the DI tree,
which can have some unexpected effects:

- Lazy loaded module providers (services) are available until the module has been loaded.

- These providers are not available globally, but instead are scoped to the lazy loaded module.

Together,
these consequences mean that it's possible to have services that belong to a lazy loaded module,
but are not accessible to the root module or any other eagerly loaded module of our application.

We discuss the details in [Lazy Loading and the Dependency Injection Tree](https://angular-2-training-book.rangle.io/handout/modules/lazy-load-di.md),
[Creating a Feature Module](https://angular-2-training-book.rangle.io/handout/modules/feature-modules.md),
and [Sharing the Same Dependency Injection Tree](https://angular-2-training-book.rangle.io/handout/modules/shared-di-tree.md),
but as a rule of thumb:

1. If we want to provide a service as an application-level singleton, we should use the `forRoot()` function.
2. If we want to provide a service to feature modules, we should always use `forChild()`.

## 5. Confusing the Source of Truth Between Router and Application State

It is common (or at least tempting) for code to try to manage state and router events
as two separate things
rather than treating state changes like "selecting an item"
as a route transition to being with.
This is an unnecessary complication,
since
Angular's router allows us to define a client-side routing structure
and manages transitions between those routes,
but it does not manage or mutate our application's state.
This means that we are responsible for updating that state
in response to navigation events.

Luckily,
the router exposes routing events as an observable called `Router.events`.
To synchronize the application's state
or to initialize state based on the URL when the application is first loaded,
we should subscribe to router events and take appropriate actions.
Crucially,
since router events are the only hooks available to us,
we should ensure that all route transitions are triggered using `routerLink`
or programatically using `router.navigate()`.
Doing an end-run around these facilities will almost certainly get us into trouble
sooner rather than later.

## 6. Not Using Content Projection

Most programmers now prefer composition over inheritance when designing software systems.
In the Angular world,
the equivalent is to prefer content projection over templates with complex nested markup.
When we do this,
our application consists of a toolbox of small, single-responsibility components
which are then composed into a "just-in-time architecture"
to satisfy current business needs.
This approach:

- makes the component hierarchy flatter,
- avoids excessive chaining of `@Input`/`@Output` to pass state down the component tree and events up,
- makes it easier to test components, since we don't have to deal with logic in views, and
- allows us to leverage existing components for implementing new features.

This pattern is especially important for form elements
since it allows us to connect models and event handlers at the container level
instead of having to pass them down through multiple levels.

For example,
by creating generic wrapper components
we can use the same set of components to create:

- an image card
- a card with a title and caption
- a card with a title, caption, and icon
- and many more combinations

```html
<Card>
  <Media [source]="'img/rotary-phone.png'"></Media>

  <Block paddingX="2" paddingY="2">

    <Heading size="2">
      Choosing the Right Antique Rotary Phone for You.
    </Heading>

    <Block>
      <Heading size="3" muted>21 hours ago</Heading>
      <Button style="clear" (handleClick)="addToCart($event)" >
        <Icon name="add-to-cart" />
      </Button>
    </Block>

  </Block>
</Card>
```

For more on this subject see the post
[Flattening Deep Hierarchies of Components](http://blog.rangle.io/flattening-deep-hierarchies-of-components)
on the Rangle.io blog.

## 7. Using Model-Driven Forms Straight Away

Template-driven forms require less boiletplate, setup, and mental overhead than model-driven forms.
When we rely on templates,
wedon't need to configure a back-end model,
but insteadcan simply compose the form in your template.
Easy composition of these template-driven forms is facilitated by leveraging content projection
so that form logic and state can be handled at the container level.

That said,
model-driven forms are more appropriate for working with complex dynamically generated forms.
When `ngIf` and `ngFor` aren't enough,
or become unreadable and unmaintainable,
we have probably entered territory where model-driven forms are
a more appropriate solution.

I don't know if @smithad15 would have anything to add, but I think those are the main points

## 8. Using Redux Directly Inside Components

We can divide components into [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
Presentational components are responsible for how things look:
they receive data through `@Input` and handle events by invoking callbacks
or by dispatching events through `@Output`.
Container components are responsible for defining how things work,
i.e., for fetching data and updating state.

When we are using Redux,
every component should be of exactly one kind.
Presentational components should be completely unaware that Redux is being used:
as far as they're concerned,
"data happens" and their job is to render it.
Container components,
on the other hand,
should subscribe to data,
passing relevant parts down to their children
and mapping events to dispatch calls.

But even container components should avoid directly interacting with Redux
since this leads to components that are tightly coupled to state management.
Instead,
we should use selector services to access state
and action creator services to dispatch actions.
This pattern may feel unnecessarily convoluted in a small application,
but quickly proves its worth as the application scales.

The example below shows a common scenario
in which components require authorization-related state such as `isAuthenticated`,
`currentUser`,
and `userProfile`.
All of this information is available in the data store,
so container components could access it directly.
In order to achieve that,
though,
these components would need to be aware of the shape of the store.
Additionally,
this information will be used by multiple container components,
which means the selector logic would be repeated in each one.
Both factors would make our application brittle to future changes.

We can avoid this tight coupling by using selector services,
so that refactoring the store or the reducers will only impact one service
as opposed to multiple components.
This also provides a good location to introduce memoization
to improve selector performance.
For example:

```ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { path } from 'ramda';
import { NgRedux } from '@angular-redux/store';

import { AppState } from '../store';
import { AuthState, AuthProfile, AuthToken } from './types';

@Injectable()
export class AuthSelectors {

  constructor(private ngRedux: NgRedux<AppState>) {}

  currentUser$(): Observable<AuthState> {
    return this.ngRedux.select<AuthState>(path<AuthState>(['user']));
  }

  userProfile$(): Observable<AuthProfile> {
    return this.ngRedux.select<AuthProfile>(path<AuthProfile>(['user', 'profile']));
  }

  isAuthenticated$(): Observable<boolean> {
    return this.ngRedux.select<AuthToken>(path<AuthToken>(['user', 'token']))
      .map<AuthToken, boolean>(Boolean)
      .distinctUntilChanged();
  }

  error$(): Observable<Error> {
    return this.ngRedux.select<Error>(path<Error>(['user', 'error']));
  }
}
```

Note that in the example above,
`path` is a utility function from [Ramda](http://ramdajs.com/docs/#path)
that allows us to retrieve the value at a given location (or path) in our data store.

As a second example,
we can build an action creator service
to handle actions and action types related to a specific domain.
Again,
this feels like over-engineering in a twenty-line example,
but avoiding tight coupling with Redux
and not having to import action types into multiple components
pays off quickly.

```ts
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { Action } from '../store';
import { LoginCredentials, AuthToken, AuthProfile } from './types';

@Injectable()
export class AuthActions {

  static readonly USER = {
    LOGIN: 'AUTH/USER/LOGIN',
    LOGGED_IN: 'AUTH/USER/LOGGED_IN',
    LOGOUT: 'AUTH/USER/LOGOUT',
  };

  static readonly PROFILE = {
    LOAD: 'AUTH/PROFILE/LOAD',
    LOADED: 'AUTH/PROFILE/LOADED',
  };

  @dispatch()
  loginUser(email: string, password: string): Action<LoginCredentials> {
    return {
      type: AuthActions.USER.LOGIN,
      payload: { email, password },
    };
  }

  @dispatch()
  logoutUser(): Action {
    return {
      type: AuthActions.USER.LOGOUT,
    };
  }

  userLoggedIn(token: AuthToken): Action<AuthToken> {
    return {
      type: AuthActions.USER.LOGGED_IN,
      payload: token,
    };
  }

  loadProfile(token: string): Action<string> {
    return {
      type: AuthActions.PROFILE.LOAD,
      payload: token,
    };
  }

  profileLoaded(profile: AuthProfile): Action<AuthProfile> {
    return {
      type: AuthActions.PROFILE.LOADED,
      payload: profile,
    };
  }
}
```

## 9. Direct DOM Manipulation With `ElementRef`

One of Angular's strengths is that
it allows us to decouple the application code from the renderer,
which in turn allows us to write applications that can be executed in the browser,
on the server,
or even as native apps (using NativeScript) with a single codebase.
In order to achieve this,
though,
we need to be mindful of how we interact with the DOM.
In particular,
mutating `ElementRef.nativeElement` directly
makes the application aware of DOM rendering,
which means we can no longer execute the application on the server or in a web worker.

We can use a few strategies to avoid this:

- Use data-binding, components or directives to achieve a dynamic look and feel.
- Prefer CSS for dynamic styling and layout.
- Use structural directives for dynamic templates.
- Use [`Renderer2`](https://angular.io/docs/ts/latest/api/core/index/Renderer2-class.html) for lower-level DOM access.

As an example,
this component uses a renderer to handle tabs:

```ts
@Component({
  selector: 'md-tab-group, mat-tab-group',
  ...
})
export class MdTabGroup {
  constructor(private _renderer: Renderer2) {}

  _setTabBodyWrapperHeight(tabHeight: number): void {
    ...
    this._renderer.setStyle(this._tabBodyWrapper.nativeElement, 'height',
       this._tabBodyWrapperHeight + 'px');
  }
}
```

While it may seem clumsier or more complicated than direct DOM manipulation,
an approach like this is better suited to server-side rendering and similar use cases.

## 10. Testing with `TestBed` Prematurely

`TestBed` allows us to create a testing module
that can then be configured using `configureTestingModule`
and used to insatiate components or even a full dependency injection tree.
It is a very powerful utility,
but it does require a fair bit of setup and maintenance.
In many cases,
leaner testing strategies can achieve the same goals.

Let's take a look at class instantiation with mocked dependencies.
When we use services,
we aim to write business logic using pure functions,
i.e.,
to (mostly) build Presentational components without any internal state.
This allows us to test these components and services by simply instantiating their classes.
An example of such a class is:

```ts
@Injectable()
export class QuoteService {

  constructor(private apiService: ApiService) {
    this.getTodos();
  }

  getTodos() {
    this.apiService.get('/todos')
      .subscribe(todos => {
        this.todos = todos;
      });
  }
}
```

To test this `QuoteService`
we need to provide a mock `ApiService`,
which we must cast to the type of service being mocked.
(As discussed in [Alternative HTTP Mocking Strategy](https://angular-2-training-book.rangle.io/handout/testing/services/alt-http-mocking.md),
this same strategy can be used for testing services that inject `Http` instead of having to use `MockBackend`.)
Here's what it looks like in practice:

```ts
describe('Quote Service', () => {

  let mockApiService: ApiService;
  let quoteService: QuoteService;
  let mockResponse = [ ... ]; // mock todos response

  beforeEach(() => {
    mockApiService = { get: null } as ApiService;
    spyOn(mockApiService, 'get').and.returnValue(Observable.of({
      json: () => mockResponse
    }));

    quoteService = new QuoteService(mockApiService);
  });

  it('should get to dos', () =>
    QuoteService.getTodos()
      .subscribe(res => {
        expect(mockApiService.get).toHaveBeenCalledWith('/todos');
        expect(res).toEqual(mockResponse);
      });
  );
});
```

While lightweight tests can be done using lightweight tools,
there are some scenarios where `TestBed` does make it easier to write an effective test:

- Testing template logic or structural directives.
- Shallow rendering test for stateless components.
- Integration tests where you want to test a feature as a whole.
- Testing services or components that rely on router events.

In these cases,
`TestBed`'s learning curve is amply rewarded.

## Conclusion

Some application frameworks seem to be built entirely out of chainsaws.
Angular isn't,
but investing a little effort up front in learning how *not* to use it
pays dividends for the life of the project.
As it continues to evolve,
we expect that some of these traps will be eliminated,
or that developers will find and share patterns
to guide their peers toward what is safest and most productive.
If you have insights you would like to share,
we would enjoy hearing from you.
