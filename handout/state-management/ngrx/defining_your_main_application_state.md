# Defining your Main Application State

When building an application using Redux, the first thing to think about is,
"What state do I want to store?" It is generally a good idea to capture all
of the application's state so that it can be accessible from anywhere and all 
in one place for easy inspection.

In the application state, we store things like:

* Data received through API calls
* User input
* Presentation state, such as menu and button toggles
* Application preferences
* Internationalization messages
* Themes and other customizable areas of your application

To define your application state, use an interface called `AppState` or 
`IAppState`, depending on the naming conventions used on your project. 

Here's an example:

_app/models/appState.ts_
```typescript
export interface AppState {
  readonly colors: Colors;
  readonly localization: Localization;
  readonly login: Login;
  readonly projectList: ProjectList;
  readonly registration: Registration;
  readonly showMainNavigation: boolean;
}
```

> **Note:** We're using `readonly` to ensure compile-time immutability, and it
provides the simplest immutable implementation without adding more dependencies 
to clutter the examples. However, feel free to use another approach on your
project that makes sense for your team.