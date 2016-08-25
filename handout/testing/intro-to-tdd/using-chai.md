# Using Chai

Chai is an assertion library with some tasty syntax sugar that can be paired with any other testing framework. It lets us write tests in a TDD (Test Driven Development) style or BDD (Behavior Driven Development) style. We already know what TDD is (read the intro!), so what exactly is BDD? Well BDD is the combination of using TDD with natural language constructs (English-like sentences) to express the behavior and outcomes of unit tests. Jasmine already uses a TDD style, so we'll be using Chai for its BDD interfaces, mainly through the use of `should` and `expect`.

```js
describe('Testing math', () => {
  it('multiplying should work', () => {
    let testMe = 16;

    // Using the expect interface
    chai.expect(testMe).to.be.a('number');
    chai.expect(testMe).to.equal(16);

    // Using the should interface
    chai.should();
    testMe.should.be.a('number');
    testMe.should.equal(16);
  });
});
```

The `expect` and `should` interface both take advantage of chaining to construct English-like sentences for describing tests. Once you've decided on a style you should maintain that style for all your other tests. Each style has its own unique syntax; refer to the [documentation for that specific API](http://Chaijs.com/guide/styles/).
