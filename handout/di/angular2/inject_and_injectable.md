# `@Inject` and `@Injectable`

Statements that look like `@SomeName` are decorators.  [Decorators][decorators]
are a proposed extension to JavaScript.  In short, decorators let programmers
modify and/or tag methods, classes, properties and parameters.  There is a lot
to decorators. In this section the focus will be on decorators relevant to DI:
`@Inject` and `@Injectable`.  For more information on Decorators
please see [the EcmaScript 6 and TypeScript Features section](../../features/README.md).

## @Inject()

`@Inject()` is a _manual_ mechanism for letting Angular know that a
_parameter_ must be injected.  It can be used like so:

```typescript
import { Component, Inject } from '@angular/core';
import { ChatWidget } from '../components/chat-widget';

@Component({
  selector: 'app-root',
  template: `Encryption: {{ encryption }}`
})
export class AppComponent {
  encryption = this.chatWidget.chatSocket.encryption;

  constructor(@Inject(ChatWidget) private chatWidget) { }
}
```

In the above we've asked for `chatWidget` to be the singleton Angular associates with
the `class` symbol `ChatWidget` by calling `@Inject(ChatWidget)`.  It's important
to note that we're using `ChatWidget` for its typings _and_ as a _reference_ to
its singleton. We are _not_ using `ChatWidget` to instantiate anything, Angular
does that for us behind the scenes.

When using TypeScript, `@Inject` is only needed for injecting _primitives_.
TypeScript's types let Angular know what to do in most cases.  The above
example would be simplified in TypeScript to:

```typescript
import { Component } from '@angular/core';
import { ChatWidget } from '../components/chat-widget';

@Component({
  selector: 'app',
  template: `Encryption: {{ encryption }}`
})
export class App {
  encryption = this.chatWidget.chatSocket.encryption;

  constructor(private chatWidget: ChatWidget) { }
}
```
[View Example](https://plnkr.co/edit/BAYoY7W6tUkbnczk3Lsg?p=preview)


## @Injectable()

`@Injectable()` lets Angular know that a _class_ can be used with the
dependency injector.  `@Injectable()` is not _strictly_ required if the class
has _other_ Angular decorators on it or does not have any dependencies.
What is important is that any class that is going to be injected with Angular
_is decorated_.  However, best practice is to decorate injectables with
`@Injectable()`, as it makes more sense to the reader.

Here's an example of `ChatWidget` marked up with `@Injectable`:

```typescript
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { AuthWidget } from './auth-widget';
import { ChatSocket } from './chat-socket';

@Injectable()
export class ChatWidget {
  constructor(
    public authService: AuthService,
    public authWidget: AuthWidget,
    public chatSocket: ChatSocket) { }
}
```

In the above example Angular's injector determines what to inject into
`ChatWidget`'s constructor by using type information.  This is possible because
these particular dependencies are typed, and are _not primitive_ types.
In some cases Angular's DI needs more information than just types.

[decorators]: http://blog.wolksoftware.com/decorators-reflection-javascript-typescript "ES Decorators Explained"
