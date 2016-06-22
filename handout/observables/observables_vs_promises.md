# Observables vs Promises

Both promises and observables provide us with abstractions that help us deal with the asynchronous nature of our applications. However, there are important differences between the two:

- As seen in the example above, observables can define both the setup and teardown aspects of asynchronous behaviour.

- Observables are cancellable.

- Moreover, observables can be retried using one of the retry operators provided by the API, such as `retry` and `retryWhen`. On the other hand, promises require the caller to have access to the original function that returned the promise in order to have a retry capability.
