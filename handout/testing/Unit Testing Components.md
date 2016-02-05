# Unit Testing Components

Testing Angular 2 components requires some insight into the Angular 2 `angular2/testing` module. Though many features of Jasmine are used in Angular’s testing module there are some very specific wrappers and routines that Angular requires when testing components. 

## Verifying Methods and Properties

We can test the properties and methods of simple Angular 2 components fairly easily, after all, Angular 2 components are simple Javascript classes that we can create and interface with. Say we had a simple component that kept a current message displayed. The contents of the message could be changed through the function`setMessage` and the function `clearMessage` would put an empty message in place. This is a very trivial component but how would be test it?

*message.component.ts*

``` typescript
import {Component} from 'angular2/core'
  
@Component({
  selector: 'display-message',
  template: '<h1>{{message}}</h1>'
})

export class MessageComponent {
  private message:string = "";
  
  constructor()
  
  setMessage(newMessage:string) {
  	this.message = newMessage;
  }

  clearMessage() {
    this.message = "";
  }
}
```

Now for our unit test. We'll create two tests, one to test the `setMessage` function to see if the new message shows up and another to test the `clearMessage` function to see if clearing the message works as expected. 

*message.spec.ts*

``` typescript
import {
    describe,
    expect,
    it
} from 'angular2/testing';

import {MessageComponent} from './message.component';

describe('Testing message state in message.component', () => {
    beforeEach(() => {
        this.app = new MessageComponent();
    });

    it('should set new message', () => {
        this.app.setMessage("Testing")
        expect(this.app.message).toBe("Testing");
    });

	it('should clear message', () => {
       this.app.clearMessage("");
	   expect(this.app.message).toBe("");
    });
});
```

We have created two tests, one for `setMessage`, and the other for `clearMessage`. In order to call those functions on the `MessageComponent` class we have to initiate it, and we do this with the `beforeEach` function. The `beforeEach` function is called before each test is performed, it is where all initiate required for testing takes place. Once our `MessageComponent` object is created we can call `setMessage` and `clearMessage` and analyze the results of those actions. We formulate an expected result, and then test to see if the result we were expecting came to be. Here we are testing whether or not the message we tried to set modified the `MessageComponent` property `message` to the value we intended. If it did, then the test was successful and our `MessageComponent` works as expected. 

## Injecting Dependencies and DOM Changes

In the previous example the class we were testing `MessageComponent` did not have any injected dependencies. In Angular 2, components will often rely on services and other components in order to function, and these will be injected into the constructor of the class. When testing these components we have to inject the dependencies ourselves. Since this is an Angular specific routine, there are no pure Jasmine functions used to do this. Angular provides a list of functions in `angular2/testing` that allow us to to fully test our components. Lets take a look at a basic component:

*quote.component.ts*

``` typescript
import {QuoteService} from './quote.service';
import {Component} from 'angular2/core';

@Component({
	selector: 'my-quote',
    template: '<h3>Random Quote</h3> <div>{{quote}}</div>'
});

export class QuoteComponent {
  quote: string;
  
  constructor (private quoteService: QuoteService){}
  
  getQuote() {
  	this.quoteService.getQuote().then((quote) => {
  		this.quote = quote;
	});
   }
}
```

This component relies on the `QuoteService` to get a random quote, which it will then display. The class is pretty simple, it only has the `getQuote` function that will modify the DOM, therefore it will be are main area of focus in testing.

In order to test this component we need initiate the class `QuoteComponent`, the Angular testing library offers a way to inject any dependencies this class relies on, as well as a `TestComponentBuilder` object which will create the component for us and return a *component fixture* that we can perform tests on. 

*quote.spec.ts*

``` typescript
class MockQuoteService {
  public quote: "Test quote";
  
  getQuote() {
  	return new Promise((resolve, reject) => {
		resolve(this.quote);
	});
  }
}

import {QuoteService} from 'quote.service.ts';
import {QuoteComponent} from 'quote.component.ts';
import {
  expect, 
  it, 
  describe, 
  injectAsync, 
  TestComponentBuilder, 
  beforeEachProvider
} from 'angular2/testing';

describe("Testing Quote Component", () => {
    beforeEachProviders(() => {
		provide(QuoteService: {useClass: MockQuoteService})
	});
    
it("Should get quote", injectAsync([TestComponentBuilder], (tcb) => {
  return tcb.createAsync(QuoteComponent).then(fixture) => {

    	fixture.debugElement.componentInstance.getQuote();
    	
    	fixture.detectChanges();
	    var compiled = fixture.debugElement.nativeElement;
    	expect(compiled.querySelector('div')).toHaveText('Test Quote');	
	}
  }));
});
```

Testing the QuoteComponent is a fairly straightforward process. We want to create a QuoteComponent, feed it a quote and see if the DOM has changed such that the quote has shown up. This process requires us to create the component, pass in any dependencies, trigger the component to perform an action, and then look at the DOM to see if the action is what we expected. Lets take a look at how this is accomplished with the above unit test. 

We use `beforeEachProviders` to feed in any dependencies that our component requires. Here our component depends on the `QuoteService` to get data, we mock this data ourselves as we can have control over what value we expect to show up. It is good practise to separate component testing from service testing - this makes it easier to test as you are only focusing on a single aspect of the application at a time. If your service fails, or your component fails, how will you know which one was the culprit? Using `provide` we inject the `QuoteService` dependency using our mock class `MockQuoteService` , where we will provide mock data for the component to consume. 

Next we use `injectAsync` to inject the `TestComponentBuilder` into our test. Once we have a reference to `TestComponentBuilder` we call `createAsync` to create the component we will be testing - `QuoteComponent`. The `TestComponentBuilder` will then create a new instance of our component, fulfilling any Angular specific routines like dependency injection. The `createAsync` returns a promise, which we return as `injectAsync` expects a promise to know when the test is done. 

`TestComponentBuilder` will return a *fixture* for us to use in our tests. A fixture is powerful tool that allows us to query the DOM rendered by a component as well as change DOM elements and component properties. It is the main point of testing components and we use it extensively. Here we have gotten access to our component through the `fixture.debugElement.componentInstance` property where we call `getQuote` to kickstart our only action in the `QuoteComponent` component. We call `fixture.detectChanges` to watch for any changes in the DOM. We then get access to the native underlying DOM elements through the `fixture.debugElement.nativeElement` property. Now we can check to see if the DOM rendered by our `QuoteComponent` contains the quote that we mocked in through the `QuoteService`. The final line, attempts to assert that the DOM's div tag contains the mocked quote 'Test Quote' inside. If it does, then our component passes the test and works as expected, if it doesn't, that means our component is not outputting quotes correctly. 

### Overriding Components for Testing

In some components, providers are not directly injected through the constructor but instead defined through a decorator. Consider the following component:

``` typescript
@Component({
  selector: 'example',
  template: '<div>Simple example</div>',
  providers: [ExampleService]
});
class SimpleComponent() {}
```

This won't work when using `beforeEachProvider`, instead we can use the `TestComponentBuilder` to explicitly inject the `ExampleService` provider through `overrideProviders`. As we did before, you should create a mocked version of the `ExampleService` to feed in data you expect. 

``` typescript
it('Should work', injectAsync([TestComponentBuilder], (tcb: TestComponentBuider) => {
  tcb.overrideProviders(SimpleComponent, [provide(ExampleService: {useClass: MockExampleService})]).createAsync(SimpleComponent).then(fixture => {
  		// test your fixture here
	});
}))
```

`TestComponentBuilder` also lets you override a components template. This is useful for testing a small part of a large component, as you can ignore the output from the rest of the DOM and only focus on the part you are interested in testing. Calling `overrideTemplate` will set the components template to whatever you pass in. 

``` typescript
it('Should work', injectAsync([TestComponentBuilder], (tcb: TestComponentBuider) => {
  tcb.overrideTemplate(SimpleComponent, '<span>{{message}}</span>')
  .createAsync(SimpleComponent).then(fixture => {
  		// test all things relating to the message property here
	});
})
```

## Testing Asynchronous Actions

Some components rely on asynchronous actions to work. This can be tricky to test, as we don't know exactly know when to look at the DOM for results. Fortunately Angular provides a function `fakeAsync` which essential fakes asynchronous behaviour. FakeAsync will wrap our test in a zone, and then listen for any asynchronous operations, like setTimeouts, Promises, etc but will not actually call those functions asynchronously. Instead, it will rely on us calling the `tick` function which will call those functions immediately and simulate time elapsing. 

Suppose we had a component with a button, clicking that button will trigger a call to some service which will return data for the component to display. Heres what our unit test might look like:

```typescript
@Component({
	selector: 'example',
	template: `
		<span>{{message}}</span>
		<button (click)="performAction()">Click me</button>
	`

class SampleComponent {
	constructor() {}

	performAction () {
		setTimeout(() => {
			this.message = 'My expected data';
		}, 2000);
	}
}
```

``` typescript
it('Should work', inject([TestComponentBuilder], fakeAsync(
	(tcb: TestComponentBuider) => {
		tcb.createAsync(SampleComponent).then(fixture => {
  			tick();
            
            fixture.debugElement.nativeElement.querySelector('button').click();
            
            tick();
            
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.querySelector('span')).toHaveText('My expected data');
		});
	});
  );
}))
```

Here we have a `SampleComponent` that has a button, when clicked a `setTimeout` of 2 seconds will be called to set the message property to 'My expected data'. Our unit test builds our component using the `TestComponentBuilder`. We have wrapped our entire test in `fakeAsync` which will allow us to test the asynchronous behaviour of our component using synchronous function calls. We call `tick` which will wait for all events to finish firing in our component before continuing. We then simulate a button click, and then immediately call `tick` again. Now as our test sits and waits for our component to finish handling the button click, retrieving data, and rendering the data. We can then check to see what showed up in our DOM by calling  `detectChanges` and querying the DOM for our expected result. 


## Refactor Hard-to-Test Code

As you start writing unit tests, you may find that a lot of your code is hard to test. The best strategy is often to refactor your code so as to make it easy to test. For example, consider refactoring your component code into services and focusing on service tests or vice versa.