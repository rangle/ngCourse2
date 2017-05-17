# Ten Ways to Misuse Angular

## 1. Ignoring a component’s host element
When creating Angular components you should use the host element as a wrapper instead of creating your own wrapper elements.

The card component below renders a heading and a paragraph. In order to control their layout we need a wrapper element. You might be tempted to wrap them in a `<div>`, but that is not required. Angular will render this with a `<my-card>` wrapper element. This is called a host element.

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

We can style the host element by targeting it with the `:host` selector in the component's CSS file. Alternatively you can attach CSS classes to it using [host metadata](https://angular.io/docs/ts/latest/cookbook/ts-to-js.html#!#host-metadata).

```ts
@Component({
  selector: 'my-card',
  host: { class: 'db ma0 lh-title' },
  ...
})
export class CardComponent { title = 'Title of card'; }
```

We can use host metadata to bind to all properties and events of the host element. Alternatively, you can use the `@HostBinding` and `@HostListener` decorators.

### Metadata vs decorators
Host metadata and `@Host*` decorators can generally be used interchangeably however, there are some subtle differences. Consider the following scenario:

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

and somewhere later in our app you use them as:

```html
<my-foo class="underline"></my-foo>
<my-bar class="underline"></my-bar>
```

`<my-foo>` will render with `class="underline navy"` however, `<my-bar>` will render with `class="navy"`. This is because `@HostBinding` only supports binding of values. Whereas, host metadata supports both binding and static values. In this case we are using a static value. Therefore, it merges what we have defined in the metadata with what is defined on the component. If we had bound class to a component property then they would behave the same:

```ts
@Component({
  selector: 'my-foo',
  host: { '[class]': 'className' },
})
export class FooComponent {
  className = 'navy';
}
```



## 2. Avoiding observables
When working with Angular you should be using observables as much as possible. Angular exposes HTTP requests, form events, route params, etc. as observables. Therefore, by using observables we can build apps that have a consistent architectural pattern.

### Leverage Observable Operators
We can leverage observable operators to compute data based on application state. This allows us to reduce the amount of state we need to maintain. Additionally these computations can expressed as pure functions which makes testing easier. These pure play a similar to role to [selectors](https://github.com/reactjs/reselect) and can be memoized.

This pattern can be adopted regardless of whether you are using ngrx, angular-redux or even just services to manage state. When woking with Angular services you can replicate a _store_ style API using Behavior Subjects. In the example below we have a `TodoStore` service. It exposes the entire store as the `state$` observable. To display a list of filtered todos we can simply `map` onto the state$` observable instead of maintaining multiple lists.


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

Observables also allow us to merge multiple streams to implement complex workflows such as a [debounced search which ignores stale requests](../http/search_with_flatmap.md) in a declarative manner.


### Subscribing to Data
To access a data property use operators such as `map` or `pluck` to derive separate streams. This allows you to utilize the `async` pipe in the templates and removes the need for managing subscriptions in the component class.

When accessing multiple properties subscribing to the base observable will likely be a better option.




## 3. Using the Raw `Http` Service
It is highly recommended to create a wrapper service for the Angular `Http` service. This allows you to create a layered architecture for consuming RESTful APIs. The wrapper service, let's call it `ApiService`, will be the base. This is where you can map each request to handle `res.json()`. It provides a centralized location for error handling, logging and attaching auth tokens.

The next layer up will be domain specific services such as `UserService`, `PostsService`, `CommentsService`, etc. These services use the `ApiService` for making HTTP requests. This makes testing easier since now we only have to mock out the `ApiService` and not rely on Mocking HTTP responses. These services are also the perfect place to implement data transformations. Your app should not necessarily consume data as it is returned from the API. You should consider normalizing and reshaping it into a format that is better suited to managing state. [normalizr](https://github.com/paularmstrong/normalizr) is a great option for this task.

You should avoid using using the `Http` service or `ApiService` directly in components.





## 4. Not Considering the Injector Tree when Lazy Loading Modules
Lazy loaded modules create their own branch on the Dependency Injection tree. This leads to some non-obvious effects:

- Lazy loaded module providers (services) will not be available until the module has been loaded in.
- These providers will not be available globally, but rather scoped to the lazy loaded module.

This means that it's possible to have services that belong to a lazy loaded module, that are not accessible by the root module or any other eagerly loaded module of your application.

For more detailed examples see [Lazy Loading and the Dependency Injection Tree](../modules/lazy-load-di.md), [Creating a Feature Module](../modules/feature-modules.md) and [Sharing the Same Dependency Injection Tree](../modules/shared-di-tree.md) sections.

If you would like to provide a service as an application-level singleton use the `forRoot()` function. For providing services to feature modules you should always use `forChild()`.




## 5. Confusing the Source of Truth Between Router and Application State
The angular router allows us to define a client side routing structure and manages transitions between those routes. It does not however, manage or mutate your application state. You are responsible for updating the application state in response to navigation events.

Angular router exposes routing events as an observable – `Router.events`. To synchronize your application state or to hydrate state on first load (based on the url) you should subscribe to the router events observable and dispatch suitable actions. Since the router events are the only hooks available to us we should ensure that all route transitions are triggered through `routerLink` or programatically using `router.navigate()`




## 6. Not using content projection
For components prefer projection over templates with complex nested markup. This allows you apply the principles of function composition for views. Instead of having one massive component which accounts for various scenarios you create a toolbox of smaller single responsibility components. This approach has several benefits:

- It makes the component hierarchy flatter.
- Avoids excessive chaining of `@Input`/`@Output` to pass state down/events up the component tree.
- Testing components becomes much easier since you don’t have to deal with view logic.
- Allows you to leverage existing components for implementing new features.

This pattern is especially important for form elements since it allows us to connect models and event handlers at the container level instead of having to pass them down through multiple levels.

### Example
By creating generic wrapper components we can use the same set of components to create:
- An image card
- A Card with title and caption
- A card with title, caption and an icon
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
      <Button style="clear"
        (handleClick)="addToCart($event)"
      >
        <Icon name="add-to-cart" />
      </Button>
    </Block>

  </Block>
</Card>
```

For more on this subject see the [Flattening Deep Hierarchies of Components](http://blog.rangle.io/flattening-deep-hierarchies-of-components) post on the Rangle.io blog.




## 7. Using model-driven forms straight away
- Template-driven forms require less boilerplate, setup, and mental overhead
    - More composable and reusable assuming a flat form hierarchy
        - Reference previous point about content projection and flat form hierarchy
    - Primary concern is the data model itself
- Model-driven forms more appropriate for working with complex dynamically generated forms
    - Forms are generated based on some sort of schema
    - Primary concern is the display model of the form rather than the data model
    - Making composable model-driven form components requires more work
        - Passing `FormControl` references or implementing the `ControlValueAccessor` interface




## 8. Using Redux Directly Inside of Components
We can divide components into two types: [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). Where Presentational components are responsible for how things look. They receive data through `@Input` and handle events by invoking callbacks or by dispatching events through `@Output`. Container components are responsible to defining how things work i.e., fetching data and updating state.

From a redux perspective this means presentational components are completely unaware of redux. Whereas container components are the ones responsible for subscribing to data, passing it down to its children and mapping events to dispatch calls.

Even in container components we should avoid directly interacting with redux since this leads to components that are tightly coupled to state management. Instead we should use selector services to access state and action creator services to dispatch actions.


### Selector Service Example
In the example below we have a common scenario where components require auth related state such as `isAuthenticated`, `currentUser`, `userProfile`, etc. All this information is available in the store so, technically the container components can access them directly. However, in order to achieve that these components would need to be aware of the shape of the store. Additionally, this information will be used by multiple container components. The selector logic would then be repeated in each one of those components.

By creating selector services we avoid issues created by tight coupling of state to components. Refactoring the store or reducers would now only impact one service as opposed to multiple components. This also provides a good location to introduce memoization for selectors.

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

Note: `path` is a utility function from [ramda](http://ramdajs.com/docs/#path) which allows us to retrieve the value at a given path.


### Action Creator Service Example
Action creator services allow us to group actions and actions types related to a specific domain. Again, avoiding tight coupling with redux and having to import action types into multiple components.

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




## Direct DOM Manipulation with `ElementRef`
One of the major benefits of Angular is that it allows us to decouple the application code from the renderer. This allows us to write applications that can be executed in the browser, on the server or even as native apps (using NativeScript) with a single codebase. In order to achieve this we need to be mindful of how we interact with the DOM.

Mutating the `ElementRef.nativeElement` directly makes the application aware of DOM rendering. Therefore, we can no longer execute the application on the server or in a web worker. To avoid this we can rely on a few strategies:

- Use data-binding, components or directives to achieve a dynamic look and feel.
- Prefer CSS for dynamic styling and layout.
- For dynamic templates use structural directives.
- For lower-level DOM access use [`Renderer2`](https://angular.io/docs/ts/latest/api/core/index/Renderer2-class.html)

### Example of using renderer

From [angular/material2/src/lib/tabs/tab-group.ts](https://github.com/angular/material2/blob/e4789c7b88975b1811c97b9bed61b5278def0a7c/src/lib/tabs/tab-group.ts)

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



## 10. Testing with `TestBed` prematurely

`TestBed` allows us to create a testing module. This module can then be configured using `configureTestingModule` and it can be used to insatiate components or even a dependency injection tree.

`TestBed` is an extremely powerful utility however, it requires a fair bit of setup and maintenance. This is because you are creating a sandboxed application to test a service/component in isolation. In most cases this is not required. You can adopt other leaner testing strategies to achieve the same goal.


### Class Instantiation with Mocked Dependencies
With services we aim to write business logic using pure functions. For components we aim to build mostly presentational components. This allows us to test these components and services by simply instantiating the TypeScript classes – making it easier to write and maintain unit tests.

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
```

To test the `QuoteService` we need to provide a mock `ApiService`. Be sure to cast the mocks to the type of the service it is mocking. This same strategy can be used for testing services that inject `Http` instead of having to use `MockBackend`. See the [Alternative HTTP Mocking Strategy](../testing/services/alt-http-mocking.md) for a complete example.

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

### Use `TestBed` In More Advanced Cases
There will be some scenarios where in order to write an effective test you need will need to use `TestBed`. These include:

- Testing template logic or structural directives.
- Shallow rendering test for stateless components.
- Integration tests where you want to test a feature as a whole.
- Testing services or components that rely on router events.
