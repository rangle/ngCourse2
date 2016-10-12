# Angular 2's DI

The last example introduced a hypothetical `Injector` object.  Angular 2
simplifies DI even further.  With Angular 2, programmers almost never have to get
bogged down with injection details.

Angular 2's DI system is (mostly) controlled through `@NgModule`.  Specifically
the `providers` array.

For example:

```js
import { Injectable, NgModule } from '@angular/core';

@Injectable()
class ChatWidget {
  constructor(private authService: AuthService, private authWidget: AuthWidget,
    private chatSocket: ChatSocket) {}
}

@NgModule({
  providers: [ ChatWidget ],
})
export class DiExample {};
```

In the above example the `DiExample` module is told about the `ChatWidget` class. Another way of saying this is that Angular 2 has been _provided_ a `ChatWidget`.

That seems pretty straightforward, but astute readers will be wondering how
Angular 2 knows how to build `ChatWidget`.  What if `ChatWidget` was a string, or
a plain function?

Angular 2 _assumes_ that it's being given a class.

What about `AuthService`, `AuthWidget` and `ChatSocket`? How is `ChatWidget` getting those?

It's not, at least not yet.  Angular 2 does not know about them yet.  That can
be changed easily enough:

```js
import { Injectable, NgModule } from '@angular/core';

@Injectable()
class ChatWidget {
  constructor(private authService: AuthService, private authWidget: AuthWidget,
    private chatSocket: ChatSocket) {}
}

@Injectable()
class AuthService {}

@Injectable()
class AuthWidget {}

@Injectable()
class ChatSocket {}

@NgModule({
  providers: [ ChatWidget, AuthService, AuthWidget, ChatSocket ],
})
```

Okay, this is starting to look a little bit more complete. Although it's still
unclear how `ChatWidget` is being told about its dependencies.  Perhaps that is
related to those odd `@Injectable` statements.
