# Ten Ways to Misuse Angular

1. Ignoring a component’s host element
    - No need to wrap templates in a `<div>`
    - Use `:host` selector
    - Use `@HostBinding` and `@HostListener`
    - Subtle differences host metadata vs. `@Host*` decorators
1. Avoiding observables
    - Leverage observable operators
    - Merge and transform data in streams rather than direct data mutation
    - Don’t prematurely subscribe
    - Leverage `async` pipe where appropriate
1. Using the raw `Http` service
    - Avoid using `Http` in components
        - Use services instead
        - Map out `res.json()` as part of a method call
    - Work with data shapes that make sense for the application
        - Don’t necessarily consume data as returned from a API
        - Use a transformation layer to massage data into a shape that makes sense
1. Not considering the injector tree when lazy loading modules
    - DI may behave differently than expected
    - Lazy loaded module providers will not be available until the module has been loaded in
    - Lazy loaded module providers will not be globally available but rather scoped to the lazy module
    - Prefer to provide at the root module level
    - Leverage `forRoot` / `forChild` configuration
1. Confusing the source of truth between router and application state
    - State transitions should be links or router navigation calls
    - Hydrate / mutate state based on router events
        - Dispatch actions to store accordingly
1. Excessive encapsulation of child components
    - Use content projection where possible
        - Keep a flatter component hierarchy
            - Especially with forms
    - Make more generic wrapper components
    - Avoid excessive `@Input`/`@Output` chaining
1. Using model-driven forms straight away
    - Template-driven forms require less boilerplate, setup, and mental overhead
        - More composable and reusable assuming a flat form hierarchy
            - Reference previous point about content projection and flat form hierarchy
        - Primary concern is the data model itself
    - Model-driven forms tie a component to a specific schema or config
        - More useful when working with complex dynamically generated forms
            - Form models necessarily tend to be more generic
            - Primary concern is the schema or display model of the form rather than the data model
        - Making composable model-driven form components requires more work
            - Passing `FormControl` references or implementing the `ControlValueAccessor` interface
1. Using redux directly inside of components
    - Select state using selector services
    - Use action creator services to dispatch actions
1. Direct DOM manipulation
    - Prefer components or directives to achieve dynamic look and feel
        - Prefer CSS for styling
    - For dynamic templates, prefer structural directives
    - Use `Renderer` if really necessary
    - Only use `ElementRef` and DOM as a last resort
        - Understand the caveats
1. Testing with `TestBed` prematurely
    - `TestBed` is the more advanced case
    - Prefer simple class instantiation w/ mocked dependencies
    - Cast mocks as their correct types
    - Use `TestBed` to test:
        - Templates (logic, directives/structural directives, stateless components)
        - Code integration tests
        - Router events

---

## Things that did not make the list

1. Using the default CLI directory structure
    - You can configure the paths code is generated under.
    - Create a meaningful directory structure
1. Sticking with the default change detection strategy
    - Don’t prematurely optimize, `default` is performant in most cases
    - Use `onPush`, `markForCheck()`, and `detectChanges()` when slow downs are encountered
1. Not considering routing early on
    - It’s easier to write your code using the router first, rather than refactoring later
        - Modules will need to be refactored
        - Container components that rely on `@Input`’s will need to be refactored
1. Over-dependence on ViewEncapsulation
    - Use atomic CSS to avoid ViewEncapsulation CSS bloat
1. Over-barreling
    - Importing through more than one level of barrelling _could_ mess up
    - i.e. `../../core` => `../../core/auth`
    - Types will be found correctly, but classes may not compile
1. Importing from `rxjs`
    - Import specific constructs and operators from their respective paths for better tree-shaking i.e.
        - `{ Observable } from rxjs/observable`
        - `rxjs/operators/add/map`
1. Creating one monolithic module
    - Create small domain or feature specific modules
1. Using the `public` keyword
    - Everything is public in JavaScript by default.
    - Once compiled, the `public` and `private` keywords mean nothing
1. Using bracket notation on data selected by key or path from the store
    - `.select` by property or path is not typed
    - You must cast the return type of `select` or type the parameter in your callback
1. Misunderstanding chaining Observable `catch` operator
    - `.catch` expects an `Observable` to be returned in order to continue the chain
1. Not testing private methods
    - Private methods can and should be tested
    - Must type cast a class (as `any`) to access private methods and members in tests
    - Better to make private methods pure utility functions instead which live in another file
