# Testing Asynchronous Actions

Sometimes we need to test components that rely on asynchronous actions that happen at specific times.  Angular provides a function called `fakeAsync` which allows us to simulate the passage of time. FakeAsync wraps our tests in a zone and gives us access to the `tick` function which will allow us to simulate the passage of time precisely.

Suppose we had a component with a button, clicking that button will trigger an action within a setTimeout of 2 seconds. Here's what our component and unit test might look like:

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
  fakeAsync(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(SampleComponent).then(fixture => {
      fixture.debugElement.nativeElement.querySelector('button')
        .click();

      tick(2000);

      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('span'))
        .toHaveText('My expected data');
    });
  }));
);
```

Here we have a `SampleComponent` that has a button, when clicked a `setTimeout` of 2 seconds will be called to set the message property to 'My expected data'. Our unit test builds our component using the `TestComponentBuilder`. We have wrapped our entire test in `fakeAsync` which will allow us to test the asynchronous behaviour of our component using synchronous function calls. We simulate a button click, and then immediately call `tick(2000)` which simulates a 2 second delay.  We can then run `detectChanges` and query the DOM for our expected result.
