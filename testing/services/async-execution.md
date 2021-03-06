# Executing Tests Asynchronously

Since services operate in an asynchronous manner it may be useful to execute a service's entire unit test asynchronously. This can speed up the overall time it takes to complete a full testing cycle since a particular long unit test will not block other unit tests from executing. We can set up our unit test to return a promise, which will resolve as either a success or failure depending on the activity of the test.

```javascript
describe('verify search', () => {
  it('searches for the correct term',
    fakeAsync(inject([SearchWiki, MockBackend], (searchWiki, mockBackend) => {
        return new Promise((pass, fail) => {
          ...
        });
    })));
});
```

Instead of only using `inject`, we use `fakeAsync` to wrap it and fulfill dependencies and execute the test in an asynchronous process. Using `fakeAsync` requires us to return a Promise, which we use to resolve the competition of our test by calling `pass`, or `fail`, depending on the results of our test.

