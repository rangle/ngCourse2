# Injection Beyond Classes

So far the only types that injection has been used for have been classes, but Angular is not limited to injecting classes. The concept of `providers` was also briefly touched upon.

So far `providers` have been used with Angular's `@NgModule` meta in an array. `providers` have also all been class identifiers. Angular lets programmers specify providers with a more verbose "recipe". This is done with by providing Angular an Object literal \(`{}`\):

```typescript
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component
import { ChatWidget } from './components/chat-widget';

@NgModule({
  providers: [ { provide: ChatWidget, useClass: ChatWidget } ],
})
export class DiExample {};
```

This example is yet another example that `provide`s a class, but it does so with Angular's longer format.

This long format is really handy. If the programmer wanted to switch out `ChatWidget` implementations, for example to allow for a `MockChatWidget`, they could do this easily:

```typescript
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component
import { ChatWidget } from './components/chat-widget';
import { MockChatWidget } from './components/mock-chat-widget';

@NgModule({
  providers: [ { provide: ChatWidget, useClass: MockChatWidget } ],
})
export class DiExample {};
```

The best part of this implementation swap is that the injection system knows how to build `MockChatWidget`, and will sort all of that out.

The injector can use more than classes though. `useValue` and `useFactory` are two other examples of `provider` "recipes" that Angular can use. For example:

```javascript
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component

const randomFactory = () => { return Math.random(); };

@NgModule({
  providers: [ { provide: 'Random', useFactory: randomFactory } ],
})
export class DiExample {};
```

In the hypothetical app component, 'Random' could be injected like:

```javascript
import { Component, Inject, provide } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `Random: {{ value }}`
})
export class AppCompoennt {
  value: number;

  constructor(@Inject('Random') r) {
    this.value = r;
  }
}
```

[View Example](http://plnkr.co/edit/BKMZYlAviRhauCzxMnx6?p=preview)

One important note is that 'Random' is in quotes, both in the `provide` function and in the consumer. This is because as a factory we have no `Random` identifier anywhere to access.

The above example uses Angular's `useFactory` recipe. When Angular is told to `provide` things using `useFactory`, Angular expects the provided value to be a function. Sometimes functions and classes are even more than what's needed. Angular has a "recipe" called `useValue` for these cases that works almost exactly the same:

```typescript
import { NgModule } from '@angular/core';
import { AppComponent } from './containers/app.component'; // hypothetical app component

@NgModule({
  providers: [ { provide: 'Random', useValue: Math.random() } ],
})
export class DiExample {};
```

[View Example](http://plnkr.co/edit/xGMOsHn1v3tTbc9RkuDz?p=preview)

In this case, the product of `Math.random` is assigned to the `useValue` property passed to the `provider`.

