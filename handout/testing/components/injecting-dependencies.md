# Injecting Dependencies and DOM Changes

In the previous example the class we were testing, `MessageComponent`, did not have any injected dependencies. In Angular 2, components will often rely on services and other classes (pipes/providers/etc.) to function, which will be injected into the constructor of the components class. When testing these components we have to inject the dependencies ourselves. Since this is an Angular-specific routine, there are no pure Jasmine functions used to accomplish this. Angular provides a multitude of functions in `@angular/core/testing` that allows us to to effectively test our components. Let's take a look at a basic component:

*quote.component.ts*

```js
import { QuoteService } from './quote.service';
import { Component } from '@angular/core';

@Component({
  selector: 'my-quote',
  template: '<h3>Random Quote</h3> <div>{{quote}}</div>'
})

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

This component relies on the `QuoteService` to get a random quote, which it will then display. The class is pretty simple - it only has the `getQuote` function that will modify the DOM, therefore it will be our main area of focus in testing.

In order to test this component we need initiate the `QuoteComponent` class. The Angular testing library offers a utility called `TestBed`. This allows us to configure a testing module where we can provided mocked dependencies. Additionally it will create the component for us and return a *component fixture* that we can perform testing operations on.

*quote.spec.ts*

```js
import { QuoteService } from './quote.service';
import { QuoteComponent } from './quote.component';
import { provide } from '@angular/core';
import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';

class MockQuoteService {
  public quote: string = 'Test quote';

  getQuote() {
    return Promise.resolve(this.quote);
  }
}

describe('Testing Quote Component', () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuoteComponent
      ],
      providers: [
        { provide: QuoteService, useClass: MockQuoteService }
      ]
    });
    fixture = TestBed.createComponent(QuoteComponent);
    fixture.detectChanges();
  });

  it('Should get quote', async(inject([], () => {
    fixture.componentInstance.getQuote();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('div').innerText).toEqual('Test quote');
      });
  })));
});
```
[View Example](http://plnkr.co/edit/zPpp86FBJUkqcZlLGH0O?p=preview)

Testing the `QuoteComponent` is a fairly straightforward process. We want to create a `QuoteComponent`, feed it a quote and see if it appears in the DOM. This process requires us to create the component, pass in any dependencies, trigger the component to perform an action and then look at the DOM to see if the action is what we expected. Let's take a look at how this is accomplished with the above unit test.

We use `TestBed.configureTestingModule` to feed in any dependencies that our component requires. Here our component depends on the `QuoteService` to get data. We mock this data ourselves thus giving us control over what value we expect to show up. It is good practice to separate component testing from service testing - this makes it easier to test as you are only focusing on a single aspect of the application at a time. If your service or component fails, how will you know which one was the culprit? We inject the `QuoteService` dependency using our mock class `MockQuoteService`, where we will provide mock data for the component to consume.

Next we use `TestBed.createComponent(QuoteComponent)` to create a *fixture* for us to use in our tests. This will then create a new instance of our component, fulfilling any Angular-specific routines like dependency injection. A fixture is a powerful tool that allows us to query the DOM rendered by a component, as well as change DOM elements and component properties. It is the main access point of testing components and we use it extensively.

In the `Should get quote` test we have gotten access to our component through the `fixture.componentInstance` property. We then call `getQuote` to kickstart our only action in the `QuoteComponent` component. We run the test when the fixture is stable by using its `whenStable` method which will ensure the promise inside the `getQuote()` has resolved. Giving the component a chance to set the quote value. We call `fixture.detectChanges` to keep an eye out for any changes taking place to the DOM, and use the `fixture.debugElement.nativeElement` property to get access to those underlying DOM elements. Now we can check to see if the DOM rendered by our `QuoteComponent` contains the quote that we mocked in through the `QuoteService`. The final line attempts to assert that the DOM's div tag contains the mocked quote 'Test Quote' inside. If it does, then our component passes the test and works as expected; if it doesn't, that means our component is not outputting quotes correctly.

We wrap `Should get quote` test in `async()`. This is to allow our tests run in an asynchronous test zone. Using `async` creates a test zone which will ensure that all asynchronous functions have resolved prior to ending the test.
