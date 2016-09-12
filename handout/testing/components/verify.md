# Verifying Methods and Properties

We can test the properties and methods of simple Angular 2 components fairly easily - after all, Angular 2 components are simple classes that we can create and interface with. Say we had a simple component that kept a defined message displayed. The contents of the message may be changed through the `setMessage` function, and the `clearMessage` function would put an empty message in place. This is a very trivial component but how would we test it?

*message.component.ts*

```js
import {Component} from '@angular/core';

@Component({
  selector: 'display-message',
  template: '<h1>{{message}}</h1>'
})

export class MessageComponent {
  public message: string = '';

  constructor() {}

  setMessage(newMessage: string) {
  	this.message = newMessage;
  }

  clearMessage() {
    this.message = '';
  }
}
```

Now for our unit test. We'll create two tests, one to test the `setMessage` function to see if the new message shows up and another to test the `clearMessage` function to see if clearing the message works as expected.

*message.spec.ts*

```js
import {MessageComponent} from './message.component';

describe('Testing message state in message.component', () => {
  let app: MessageComponent;

  beforeEach(() => {
    app = new MessageComponent();
  });

  it('should set new message', () => {
    app.setMessage('Testing');
    expect(app.message).toBe('Testing');
  });

  it('should clear message', () => {
    app.clearMessage();
    expect(app.message).toBe('');
  });
});
```
[View Example](http://plnkr.co/edit/REzRtUEGC6ELFXb1BPSy?p=preview)

We have created two tests: one for `setMessage` and the other for `clearMessage`. In order to call those functions we must first initialize the `MessageComponent` class. This is accomplished by calling the `beforeEach` function before each test is performed.

Once our `MessageComponent` object is created we can call `setMessage` and `clearMessage` and analyze the results of those actions. We formulate an expected result, and then test to see if the result we were expecting came to be. Here we are testing whether or not the message we tried to set modified the `MessageComponent` property `message` to the value we intended. If it did, then the test was successful and our `MessageComponent` works as expected.
