# Adding Components, Pipes and Services to a Module

In the previous section, we learned how to create a module with just one component but we know that is hardly the case. Our modules are usually made up of multiple components, services, directives and pipes. In this chapter we are going to extend the example we had before with a custom component, pipe and service.

Let's start by defining a new component that we are going to use to show credit card information.

_credit-card.component.ts_

```js
import { Component, OnInit } from '@angular/core';
import { CreditCardService } from './credit-card.service';

@Component({
  selector: 'rio-credit-card',
  template: `
    <p>Your credit card is: {{ creditCardNumber | creditCardMask }}</p>
  `
})
export class CreditCardComponent implements OnInit {
  creditCardNumber: string;

  constructor(private creditCardService: CreditCardService) {}

  ngOnInit() {
    this.creditCardNumber = this.creditCardService.getCreditCard();
  }
}
```

This component is relying on the `CreditCardService` to get the credit card number, and on the pipe `creditCardMask` to mask the number except the last 4 digits that are going to be visible.

_credit-card.service.ts_

```js
import { Injectable } from '@angular/core';

@Injectable()
export class CreditCardService {
  getCreditCard(): string {
    return '2131313133123174098';
  }
}
```

_credit-card-mask.pipe.ts_

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardMask'
})
export class CreditCardMaskPipe implements PipeTransform {
  transform(plainCreditCard: string): string {
    const visibleDigits = 4;
    let maskedSection = plainCreditCard.slice(0, -visibleDigits);
    let visibleSection = plainCreditCard.slice(-visibleDigits);
    return maskedSection.replace(/./g, '*') + visibleSection;
  }
}
```

With everything in place, we can now use the `CreditCardComponent` in our root component.

_app.component.ts_

```js
import { Component } from "@angular/core";

@Component({
  selector: 'rio-app',
  template: `
    <h1>My Angular 2 App</h1>
    <rio-credit-card></rio-credit-card>
  `
})
export class AppComponent {}
```

Of course, to be able to use this new component, pipe and service, we need to update our module, otherwise Angular is not going to be able to compile our application.

_app.module.ts_

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CreditCardMaskPipe } from './credit-card-mask.pipe';
import { CreditCardService } from './credit-card.service';
import { CreditCardComponent } from './credit-card.component';

@NgModule({
  imports: [BrowserModule],
  providers: [CreditCardService],
  declarations: [
    AppComponent,
    CreditCardMaskPipe,
    CreditCardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Notice that we have added the component `CreditCardComponent` and the pipe `CreditCardMaskPipe` to the `declarations` property, along with the root component of the module `AppComponent`. In the other hand, our custom service is configured with the dependency injection system with the `providers` property.

[View Example](https://plnkr.co/edit/8SKc6PnCQhN04veXA2Z2?p=preview)

Be aware that this method of defining a service in the `providers` property **should only be used in the root module**. Doing this in a feature module is going to cause unintended consequences when working with lazy loaded modules. 

In the next section, we are going to see how to safely define services in feature modules. 

