# Simple Test

To begin, let's start by writing a simple test in Jasmine.

```js
describe('Testing math', () => {
  it('multiplying should work', () => {
    expect(4 * 4).toEqual(16);
  });
});
```

Though this test may be trivial, it illustrates the basic elements of a unit test. We explain what this test is for by using `describe`, and we use `it` to assert what kind of result we are expecting from our test. These are user-defined so it's a good idea to be as descriptive and accurate in these messages as possible. Messages like "should work", or "testing service" don't really explain exactly what's going on and may be confusing when running multiple tests across an entire application.

Our actual test is basic, we use `expect` to formulate a scenario and use `toEqual` to assert the resulting condition we are expecting from that scenario. The test will pass if our assertion is equal to the resulting condition, and fail otherwise. You always want your tests to pass - do not write tests that have the results you want in a failed state.
