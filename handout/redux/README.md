# Redux and Ngrx

## What is Redux?

Redux is an application state manager for JavaScript applications, and keeps
with the core principles of the Flux-architecture by having a unidirectional
data flow in your application.

Where Flux applications traditionally have multiple stores, Redux applications
have only one global, read-only application state. This state is calculated by
"reducing" over a collection or stream of actions that update it in controlled ways.

One popular Angular 2 specific implementation of the Redux pattern is [Ng2-Redux](https://github.com/wbuchwalter/ng2-redux), which we'll be using to describe how to use this approach in an application.


## What is Ngrx?

Redux implementation has been very well received and has inspired the creation of [ngrx](https://github.com/ngrx "ngrx collection"), a set of modules that implement the same way of managing state as well as some of the middleware and tools in the Redux ecosystem. Ngrx was created to be used specifically with Angular 2 and [RxJS](https://github.com/Reactive-Extensions/RxJS), as it leans heavily on the observable paradigm. 

Although we'll be using Ng2-Redux, a lot of the same lessons apply with regards to ngrx though the syntax may be different and have some slight differences in what abstractions are involved.

## Resources

* [Redux Documentation](http://redux.js.org/)
* [Getting Started with Redux - Egghead.io](https://egghead.io/series/getting-started-with-redux)
* [Ng2-Redux - Angular 2 Bindings for Redux](https://github.com/wbuchwalter/ng2-redux)
* [ngrx - Redux style state management with RxJS and Angular 2](https://github.com/ngrx "ngrx collection")
* [Angular 2 Redux Starter Kit](https://github.com/rangle/angular2-redux-starter)
