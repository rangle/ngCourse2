# Redux and Ngrx

## What is Redux?

Redux is an application state manager for JavaScript applications, and keeps
with the core principles of the Flux-architecture by having a unidirectional
data flow in your application.

Where Flux applications traditionally have multiple stores, Redux applications
have only one global, read-only application state. This state is calculated by
"reducing" over a collection or stream of actions that update it in controlled ways.

One popular Angular specific implementation of the Redux pattern is [Ng2-Redux](https://github.com/wbuchwalter/ng2-redux), which we'll be using to describe how to use this approach in an application.


## What is Ngrx?

Redux implementation has been very well received and has inspired the creation of [ngrx](https://github.com/ngrx "ngrx collection"), a set of modules that implement the same way of managing state as well as some of the middleware and tools in the Redux ecosystem. Ngrx was created to be used specifically with Angular and [RxJS](https://github.com/Reactive-Extensions/RxJS), as it leans heavily on the observable paradigm.

Although we'll be using Ng2-Redux, a lot of the same lessons apply with regards to ngrx though the syntax may be different and have some slight differences in what abstractions are involved.

*For further on Redux and ngrx see the [Further reading](../further-reading.html#redux-and-ngrx) section*
