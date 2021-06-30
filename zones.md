# Zone.js

[Zone.js](https://github.com/angular/angular/tree/master/packages/zone.js/) provides a mechanism, called zones, for encapsulating and intercepting asynchronous activities in the browser \(e.g. `setTimeout`, , promises\).

These zones are _execution contexts_ that allow Angular to track the start and completion of asynchronous activities and perform tasks as required \(e.g. change detection\). Zone.js provides a global zone that can be forked and extended to further encapsulate/isolate asynchronous behaviour, which Angular does so in its **NgZone** service, by creating a fork and extending it with its own behaviours.

The **NgZone** service provides us with a number of Observables and methods for determining the state of Angular's zone and to execute code in different ways inside and outside Angular's zone.

It is important to know that Zone.js accomplishes these various interceptions by [Monkey Patching](https://en.wikipedia.org/wiki/Monkey_patch) common methods and elements in the browser, e.g. `setTimeout` and `HTMLElement.prototype.onclick`. These interceptions can cause unexpected behaviour between external libraries and Angular. In some cases, it may be preferential to execute third party methods outside of Angular's zone \(see below\).

## In The Zone

**NgZone** exposes a set of Observables that allow us to determine the current status, or _stability_, of Angular's zone.

* _onUnstable_ – Notifies when code has entered and is executing within the Angular zone.
* _onMicrotaskEmpty_ - Notifies when no more microtasks are queued for execution. _Angular subscribes to this internally to signal that it should run change detection._
* _onStable_ – Notifies when the last `onMicroTaskEmpty` has run, implying that all tasks have completed and change detection has occurred.
* _onError_ – Notifies when an error has occurred. _Angular subscribes to this internally to send uncaught errors to its own error handler, i.e. the errors you see in your console prefixed with 'EXCEPTION:'._

To subscribe to these we inject **NgZone** into our components/services/etc. and subscribe to the public Observables.

```javascript
import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class OurZoneWatchingService() {
  constructor(private ngZone: NgZone) {
    this.ngZone.onStable.subscribe(this.onZoneStable);
    this.ngZone.onUnstable.subscribe(this.onZoneUnstable);  
    this.ngZone.onError.subscribe(this.onZoneError);
  }

  onZoneStable() {
    console.log('We are stable');
  }

  onZoneUnstable() {
    console.log('We are unstable');
  }

  onZoneError(error) {
    console.error('Error', error instanceof Error ? error.message : error.toString());
  }
}
```

Subscribing to these can help you determine if your code is unexpectedly triggering change detection as a result of operations that do not affect application state.

## Change Detection

Since all asynchronous code executed from within Angular's zone can trigger change detection you may prefer to execute some code outside of Angular's zone when change detection is not required.

To run code outside of Angular's context, **NgZone** provides a method aptly named **runOutsideAngular**. Using this method, Angular's zone will not interact with your code and will not receive events when the global zone becomes stable.

In this [example](http://plnkr.co/edit/d3KGMh?p=preview) you will see in the log what happens with Angular's zone when code is run in and outside of it.

You will notice that in both cases clicking the button causes the Angular zone to become unstable due to Zone.js patching and watching **HTMLElement.prototype.onclick**, however the **setInterval** executing outside of Angular's zone does not affect its stability and does not trigger change detection.
