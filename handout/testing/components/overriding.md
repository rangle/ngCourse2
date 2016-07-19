# Overriding Components for Testing

In some components, providers are not directly injected through the constructor but instead defined through a decorator. Consider the following component:

```js
@Component({
  selector: 'example',
  template: '<div>Simple example</div>',
  providers: [ExampleService]
});
class SimpleComponent() {}
```

This won't work when using `addProviders`. Instead we can use the `TestComponentBuilder` to explicitly inject the `ExampleService` provider through `overrideProviders`. As we did before, you should create a mocked version of the `ExampleService` to feed in data you expect.

```js
  it('Should work', async(inject(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      tcb.overrideProviders(SimpleComponent, [
        provide(ExampleService, {useClass: MockExampleService})
      ]).createAsync(SimpleComponent).then(fixture => {

        // test your fixture here

      });
    }))
  );
```

`TestComponentBuilder` also lets you override a component's template. This is useful for testing a small part of a large component, as you can ignore the output from the rest of the DOM and only focus on the part you are interested in testing. Calling `overrideTemplate` will set the component's template to whatever you pass in.

```js
it('Should work', async(inject(
  [TestComponentBuilder], (tcb: TestComponentBuider) => {
    tcb.overrideTemplate(SimpleComponent, '<span>{{message}}</span>')
      .createAsync(SimpleComponent).then(fixture => {

        // test all things relating to the message property here

      // test all things relating to the message property here

    });
  }))
);
```
