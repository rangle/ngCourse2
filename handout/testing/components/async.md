# Testing Asynchronous Actions

Some components rely on asynchronous actions to work. This can be tricky to test, as we don't know exactly when to look at the DOM for results. Fortunately Angular provides a function `fakeAsync` which essential fakes asynchronous behaviour. FakeAsync will wrap our test in a zone, and then listen for any asynchronous operations, like setTimeouts, Promises, callbacks, etc but will not actually call those functions asynchronously. Instead, it will rely on us calling the `tick` function to call those functions immediately and simulate time elapsing.

Suppose we had a component with a button, clicking that button will trigger a call to some service which will return data for the component to display. Heres what our component and unit test might look like:

```js

@Component({
  selector: 'example',
  template: `
		<span>{{message}}</span>
		<button (click)="performAction()">Click me</button>
	`})

class SampleComponent {
  constructor() {}

  performAction () {
    setTimeout(() => {
      this.message = 'My expected data';
    }, 2000);
  }
}
```

```js

it('Should work', 
  fakeAsync(inject([TestComponentBuilder], (tcb: TestComponentBuider) => {
    tcb.createAsync(SampleComponent).then(fixture => {
      tick();

      fixture.debugElement.nativeElement.querySelector('button')
        .click();

      tick();

      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('span'))
        .toHaveText('My expected data');
    });
  }));
);
```

Here we have a `SampleComponent` that has a button, when clicked a `setTimeout` of 2 seconds will be called to set the message property to 'My expected data'. Our unit test builds our component using the `TestComponentBuilder`. We have wrapped our entire test in `fakeAsync` which will allow us to test the asynchronous behaviour of our component using synchronous function calls. We call `tick` which will wait for all events to finish firing in our component before continuing. We then simulate a button click, and then immediately call `tick` again. Now as our test sits and waits for our component to finish handling the button click, retrieving data, and rendering the data, we can check to see what showed up in our DOM by calling  `detectChanges` and querying the DOM for our expected result.
