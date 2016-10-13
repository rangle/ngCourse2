 # Accessing Child Component Classes #

 ## @ViewChild & @ViewChildren ##

The `@ViewChild` & `@ViewChildren` decorators allow access to the classes of child components of the current component.

`@ViewChild` selects one class instance of the given child component class when given a type.

For example, we can call `show` which is on the child component `Alert` class:

```typescript
import {Component, QueryList, ViewChild} from '@angular/core';
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

We can also use `@ViewChildren` to get a list of class instances if there are multiple, which selects a `QueryList` of the elements:

```typescript
import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
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

As shown above, when given a class type `@ViewChild` & `@ViewChildren` select child components based on type. However, they can also be passed selector strings:

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

Note that View children will not be set until `ngAfterViewInit`


## @ContentChild & @ContentChildren ##

`@ContentChild` & `@ContentChildren` work the same way as the equivalent `@ViewChild` & `@ViewChildren`, however, the key difference is that `@ContentChild` & `@ContentChildren` select from the [projected content](/handout/components/projection.md) within the component.

Again, note that content children will not be set until `ngAfterContentInit` component lifecycle hook.

[View Example](http://plnkr.co/edit/IsivWgg8A6zKVSuOLfE8?p=preview)
