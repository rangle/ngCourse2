# Testing Asynchronous Actions

Sometimes we need to test components that rely on asynchronous actions that happen at specific times. Angular provides a function called `fakeAsync` which wraps our tests in a zone and gives us access to the `tick` function, which will allow us to simulate the passage of time precisely.

Let's go back to the example of the `QuoteComponent` component and rewrite the unit test using `fakeAsync`:

```js
import { Component } from '@angular/core';
import { QuoteService } from './quote.service';

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

```js
import { QuoteService } from './quote.service';
import { QuoteComponent } from './quote.component';
import { provide } from '@angular/core';
import {
  async,
  TestBed,
  fakeAsync,
  tick,
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

  it('Should get quote', fakeAsync(() => {
    fixture.componentInstance.getQuote();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').innerText).toEqual('Test quote');
  }));
});
```
[View Example](http://plnkr.co/edit/lwsENNi428VxroAHITI1?p=preview)

Here we have a `QuoteComponent` that has a `getQuote` which triggers an asynchronous update. We have wrapped our entire test in `fakeAsync` which will allow us to test the asynchronous behavior of our component (`getQuote()`) using synchronous function calls by calling `tick()`. We can then run `detectChanges` and query the DOM for our expected result.
