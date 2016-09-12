# Overriding Dependencies for Testing

`TestBed` provides several functions to allow us to override dependencies that are being used in a test module.
- `overrideModule`
- `overrideComponent`
- `overrideDirective`
- `overridePipe`

For example, you might want to override the template of a component. This is useful for testing a small part of a large component, as you can ignore the output from the rest of the DOM and only focus on the part you are interested in testing.

```js
import {Component} from '@angular/core';

@Component({
  selector: 'display-message',
  template: `
    <div>
      <div>
        <h1>{{message}}</h1>
      <div>
    </div>
  `
})
export class MessageComponent {
  public message: string = '';

  setMessage(newMessage: string) {
  	this.message = newMessage;
  }
}
```

```js
import {MessageComponent} from './message.component';
import { provide } from '@angular/core';
import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';

describe('MessageComponent', () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: []
    });

    fixture = TestBed.overrideComponent(MessageComponent, {
      set: {
        template: '<span>{{message}}</span>'
      }})
      .createComponent(MessageComponent);

    fixture.detectChanges();
  });

  it('should set the message', async(inject([], () => {
    fixture.componentInstance.setMessage('Test message');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('span').innerText).toEqual('Test message');
    });
  })));

});
```
[View Example](http://plnkr.co/edit/DBcWsjI0dFkWLkUbE0Mb?p=preview)
