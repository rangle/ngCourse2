# Getting More From Redux and @ngrx

## Redux

Redux has a number of tools and middleware available in its ecosystem to facilitate elegant app development.

* [_Redux DevTools_](https://github.com/gaearon/redux-devtools) - a tool that displays a linear timeline of actions that have interacted with its store. Allows for replaying actions and error handling
* [_redux-thunk_](https://github.com/gaearon/redux-thunk) - middleware that enables lazy evaluation of actions
* [_redux-observable_](https://github.com/redux-observable/redux-observable) - an RxJS-based model for handling side-effects on action streams.
* \*[ng2-redux-router](https://github.com/dagstuan/ng2-redux-router) - reactive glue between the Angular router and your redux store.

## @ngrx

@ngrx provides most of its Redux implementation through the [ngrx/store](https://github.com/ngrx/store) module. Other modules are available for better integration and development.

* [_ngrx/store-devtools_](https://github.com/ngrx/store-devtools) - an ngrx implementation of the Redux DevTools
* [_ngrx/effects_](https://github.com/ngrx/effects) - a model for performing side-effects similar to `redux-saga`
* [_ngrx/router_](https://github.com/ngrx/router) and [_ngrx/router-store_](https://github.com/ngrx/router-store) - a router for Angular that can be connected to your ngrx store

