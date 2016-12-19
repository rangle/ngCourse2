 # Accessing Child Component Classes #

 ## @ViewChild and @ViewChildren ##

The @ViewChild and @ViewChildren decorators provide access to the classe of child component from the containing component.

The `@ViewChild` is a decorator function that takes the name of a component class as its input and finds its selector in the template of the containing component to bind to. `@ViewChild` can also be passed a template reference variable.

For example, we bind the class `AlertComponent` to its selector `<app-alert>` and assign it to the property `alert`. This allows us to gain access to class methods, like `show()`.

```typescript
import { Component, ViewChild } from '@angular/core';
import { AlertComponent } from './alert.component';

@Component({
	selector: 'app-root',
	template: `
    <app-alert>My alert</app-alert>
	  <button (click)="showAlert()">Show Alert</button>`
})
export class AppComponent {
  @ViewChild(AlertComponent) alert: AlertComponent;

  showAlert() {
    this.alert.show();
  }
}
```
[View Example](http://plnkr.co/edit/NEeEPfkHsYBbVuuAxz5z?p=preview)

In the interest of separation of concerns, we'd normally want to have child elements take care of their own behaviors and pass in an `@Input()`. However, it might be a useful construct in keeping things generic.

When there are multiple embedded components in the template, we can also use `@ViewChildren`. It collects a list of instances of the Alert component, stored in a QueryList object that behaves similar to an array.

```typescript
import { Component, QueryList, ViewChildren } from '@angular/core';
import { AlertComponent } from './alert.component';

@Component({
	selector: 'app-root',
	template: `
    <app-alert ok="Next" (close)="showAlert(2)">
      Step 1: Learn angular
    </app-alert>
    <app-alert ok="Next" (close)="showAlert(3)">
      Step 2: Love angular
    </app-alert>
    <app-alert ok="Close">
      Step 3: Build app
    </app-alert>
	  <button (click)="showAlert(1)">Show steps</button>`
})
export class AppComponent {
  @ViewChildren(AlertComponent) alerts: QueryList<AlertComponent>;
  alertsArr = [];

  ngAfterViewInit() {
    this.alertsArr = this.alerts.toArray();
  }

  showAlert(step) {
    this.alertsArr[step - 1].show(); // step 1 is alert index 0
  }
}
```
[View Example](http://plnkr.co/edit/zPtb3ZJLx7CWJa7RptxZ?p=preview)

As shown above, given a class type to `@ViewChild` and `@ViewChildren` a child component or a list of children component are selected respectively using their selector from the template. In addition both `@ViewChild` and `@ViewChildren` can be passed a selector string:

```typescript
@Component({
	selector: 'app-root',
	template: `
    <app-alert #first ok="Next" (close)="showAlert(2)">
      Step 1: Learn angular
    </app-alert>
    <app-alert ok="Next" (close)="showAlert(3)">
      Step 2: Love angular
    </app-alert>
    <app-alert ok="Close">
      Step 3: Build app
    </app-alert>
	  <button (click)="showAlert(1)">Show steps</button>`
})
export class AppComponent {
  @ViewChild('first') alert: AlertComponent;
  @ViewChildren(AlertComponent) alerts: QueryList<AlertComponent>;
  // ...
}
```
[View Example](http://plnkr.co/edit/EnOxkmJy7Y1LIPN4wUKc?p=preview)

Note that view children will not be set until the `ngAfterViewInit` lifecycle hook is called.


## @ContentChild and @ContentChildren ##

`@ContentChild` and `@ContentChildren` work the same way as the equivalent `@ViewChild` and `@ViewChildren`, however, the key difference is that `@ContentChild` and `@ContentChildren` select from the [projected content](/handout/components/projection.md) within the component.

Again, note that content children will not be set until the `ngAfterContentInit` component lifecycle hook.

[View Example](http://plnkr.co/edit/SkX3kkAA4uprtwfjDZ6y?p=preview)
