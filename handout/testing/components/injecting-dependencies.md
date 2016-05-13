# Injecting Dependencies and DOM Changes

In the previous example the class we were testing `MessageComponent` did not have any injected dependencies. In Angular 2, components will often rely on services and other classes (pipes/providers/etc) in order to function - which will be injected into the constructor of the components class. When testing these components we have to inject the dependencies ourselves. Since this is an Angular specific routine, there are no pure Jasmine functions used to accomplish this. Angular provides a multitude of functions in `@angular/core/testing` that allow us to to effectively test our components. Lets take a look at a basic component:

*quote.component.ts*

```js

import {QuoteService} from './quote.service';
import {Component} from '@angular/core';

@Component({
  selector: 'my-quote',
  template: '<h3>Random Quote</h3> <div>{{quote}}</div>'
});

export class QuoteComponent {
  quote: string;

  constructor(private quoteService: QuoteService){};

  getQuote() {
    this.quoteService.getQuote().then((quote) => {
      this.quote = quote;
    });
  };
}

```

This component relies on the `QuoteService` to get a random quote, which it will then display. The class is pretty simple, it only has the `getQuote` function that will modify the DOM, therefore it will be are main area of focus in testing.

In order to test this component we need initiate the class `QuoteComponent`. The Angular testing library offers a way to inject any dependencies this class relies on, as well as a `TestComponentBuilder` object which will create the component for us and return a *component fixture* that we can perform testing operations on.

*quote.spec.ts*

```js

class MockQuoteService {
  public quote: 'Test quote';

  getQuote() {
    return new Promise((resolve, reject) => {
      resolve(this.quote);
    });
  }
}

import {QuoteService} from './quote.service.ts';
import {QuoteComponent} from './quote.component.ts';
import {
  expect,
  it,
  describe,
  async
  TestComponentBuilder,
  beforeEachProvider
} from '@angular/core/testing';

describe('Testing Quote Component', () => {
  beforeEachProviders(() => {
    provide(QuoteService: {useClass: MockQuoteService})
  });

  it('Should get quote', async(inject([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(QuoteComponent).then(fixture) => {

      fixture.debugElement.componentInstance.getQuote();

      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('div')).toHaveText('Test Quote');
    }
  })));
});
```

Testing the QuoteComponent is a fairly straightforward process. We want to create a QuoteComponent, feed it a quote and see if the DOM has changed such that the quote has shown up. This process requires us to create the component, pass in any dependencies, trigger the component to perform an action, and then look at the DOM to see if the action is what we expected. Lets take a look at how this is accomplished with the above unit test.

We use `beforeEachProviders` to feed in any dependencies that our component requires. Here our component depends on the `QuoteService` to get data. We mock this data ourselves thus giving us control over what value we expect to show up. It is good practice to separate component testing from service testing - this makes it easier to test as you are only focusing on a single aspect of the application at a time. If your service fails, or your component fails, how will you know which one was the culprit? Using `provide` we inject the `QuoteService` dependency using our mock class `MockQuoteService`, where we will provide mock data for the component to consume.

Next we use `async` along with `inject` to inject the `TestComponentBuilder` into our test. Once we have a reference to `TestComponentBuilder` we call `createAsync` to create the component we will be testing - `QuoteComponent`. The `TestComponentBuilder` will then create a new instance of our component, fulfilling any Angular specific routines like dependency injection. The `createAsync` returns a promise, which we return, as `async` expects a promise to know when the test is done.

`TestComponentBuilder` will return a *fixture* for us to use in our tests. A fixture is a powerful tool that allows us to query the DOM rendered by a component, as well as change DOM elements and component properties. It is the main access point of testing components and we use it extensively. Here we have gotten access to our component through the `fixture.debugElement.componentInstance` property where we call `getQuote` to kickstart our only action in the `QuoteComponent` component. We call `fixture.detectChanges` to keep an eye out for any changes taking place to the DOM, and use the `fixture.debugElement.nativeElement` property to get access to those underlying DOM elements. Now we can check to see if the DOM rendered by our `QuoteComponent` contains the quote that we mocked in through the `QuoteService`. The final line attempts to assert that the DOM's div tag contains the mocked quote 'Test Quote' inside. If it does, then our component passes the test and works as expected, if it doesn't, that means our component is not outputting quotes correctly.
