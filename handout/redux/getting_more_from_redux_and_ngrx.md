# Getting More from Redux and Ngrx

Redux has a number of tools and middleware available in its ecosystem to facilitate elegant app development.

- *[Redux DevTools](https://github.com/gaearon/redux-devtools)* - a tool that displays a linear timeline of actions that have interacted with its store. Allows for replaying actions and error handling
- *[redux-thunk](https://github.com/gaearon/redux-thunk)* - middleware that enables lazy evaluation of actions
- *[redux-saga](https://github.com/yelouafi/redux-saga)* - a model for performing side-effects
- *[redux-observable](https://github.com/redux-observable/redux-observable)* - allows RxJS observables to be dispatched as actions

# Ngrx

Ngrx provides most of its Redux implementation through the [ngrx/store](https://github.com/ngrx/store) module. Other modules are available for better integration and development.

- *[ngrx/store-devtools](https://github.com/ngrx/store-devtools)* - an ngrx implementation of the Redux DevTools
- *[ngrx/effects](https://github.com/ngrx/effects)* - a model for performing side-effects similar to `redux-saga`
- *[ngrx/router](https://github.com/ngrx/router)* and *[ngrx/router-store](https://github.com/ngrx/router-store)* - a router for Angular 2 that can be connected to your ngrx store