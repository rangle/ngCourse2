 # Accessing Child Component Classes #

 ## @ViewChild and @ViewChildren ##
The @ViewChild and @ViewChildren decorators provide access to the classe of child component from the containing component.

The @ViewChild is a decarator function that takes the name of a component class as its input and finds it's selector in the template of the containing component to bind to. @ViewChild can also be passed a template reference variable.

For example, we bind the component class 'Alert' to its selector '<my-alert>' and assign it to the property 'alert'. This allows us to gain access to the functions in that class like Alert.show().

```typescript
import {Component, ViewChild} from '@angular/core';
import {Alert} from './alert.component';

@Component({
  selector: 'app',
  template: `
    <my-alert>My alert</my-alert>
    <button (click)="showAlert()">Show Alert</button>`
})
export class App {
  @ViewChild(Alert) alert: Alert;

  showAlert() {
    this.alert.show();
  }
}
```
[View Example](http://plnkr.co/edit/5CpQzHbNIiS1k5YuYZdw?p=preview)

In the interest of separation of concern, we'd normally want to have child elements take care of their own behaviors and pass in an `@Input()`. However, it might be a useful construct in keeping things generic.

When there are multiple embedded components in the template, we make use of @ViewChildren to collect an instance of its component class inside a QueryList container. QueryList is a TypeScript generic class that simply states it is a list container of class Alert. The embedded component in the template is identified by it's selector, in the code below that would be each '<my-alert>' selector.

```typescript
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Alert} from './alert.component';

@Component({
  selector: 'app',
  template: `
    <my-alert ok="Next" (close)="showAlert(2)">Step 1: Learn angular</my-alert>
    <my-alert ok="Next" (close)="showAlert(3)">Step 2: Love angular</my-alert>
    <my-alert ok="Close">Step 3: Build app</my-alert>
    <button (click)="showAlert(1)">Show steps</button>`
})
export class App {
  @ViewChildren(Alert) alerts: QueryList<Alert>;
  alertsArr = [];

  ngAfterViewInit() {
    this.alertsArr = this.alerts.toArray();
  }

  showAlert(step) {
    this.alertsArr[step - 1].show(); // step 1 is alert index 0
  }
}
```
[View Example](http://plnkr.co/edit/8Eak9DANedsZDHBHuLea?p=preview)

As shown above, given a class type to @ViewChild and @ViewChildren a child component or a list of children component are selected respectively using their selector from the template. In addition both @ViewChild and @ViewChildren can be passed a selector string:

```typescript
import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Alert} from './alert.component';

@Component({
  selector: 'app',
  template: `
    <my-alert #first ok="Next" (close)="showAlert(2)">Step 1: Learn angular</my-alert>
    <my-alert ok="Next" (close)="showAlert(3)">Step 2: Love angular</my-alert>
    <my-alert ok="Close">Step 3: Build app</my-alert>
    <button (click)="showAlert(1)">Show steps</button>`
})
export class App {
  @ViewChild('first') alerts: Alert;
  @ViewChildren(Alert) alerts: QueryList<Alert>;
  alertsArr = [];

  ngAfterViewInit() {
    this.alertsArr = this.alerts.toArray();
  }

  showAlert(step) {
    this.first.show();
  }
}
```

Note that View children will not be set until the 'ngAfterViewInit' lifecycle hook is called.


## @ContentChild and @ContentChildren ##

`@ContentChild` and `@ContentChildren` work the same way as the equivalent `@ViewChild` and `@ViewChildren`, however, the key difference is that `@ContentChild` and `@ContentChildren` select from the [projected content](/handout/components/projection.md) within the component.

Again, note that content children will not be set until `ngAfterContentInit` component lifecycle hook.

[View Example](http://plnkr.co/edit/IsivWgg8A6zKVSuOLfE8?p=preview)
