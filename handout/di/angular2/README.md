# Angular's DI

The last example introduced a hypothetical `Injector` object.  Angular
simplifies DI even further.  With Angular, programmers almost never have to get
bogged down with injection details.

Angular's DI system is (mostly) controlled through `@NgModule`.  Specifically
the `providers` and `declarations` array. (`declarations` is where we put components,
pipes and directives; `providers` is where we put services)

For example:

```typescript
import { Injectable, NgModule } from '@angular/core';

@Component({
  // ...
})
class ChatWidget {
  constructor(private authService: AuthService, private authWidget: AuthWidget,
    private chatSocket: ChatSocket) {}
}

@NgModule({
  declarations: [ ChatWidget ]
})
export class AppModule {
};
```

In the above example the `AppModule` is told about the `ChatWidget` class. Another way
of saying this is that Angular has been _provided_ a `ChatWidget`.

That seems pretty straightforward, but astute readers will be wondering how
Angular knows how to build `ChatWidget`.  What if `ChatWidget` was a string, or
a plain function?

Angular _assumes_ that it's being given a class.

What about `AuthService`, `AuthWidget` and `ChatSocket`? How is `ChatWidget` getting those?

It's not, at least not yet.  Angular does not know about them yet.  That can
be changed easily enough:

```typescript
import { Injectable, NgModule } from '@angular/core';

@Component({
  // ...
})
class ChatWidget {
  constructor(private authService: AuthService, private authWidget: AuthWidget,
    private chatSocket: ChatSocket) {}
}

@Component({
  // ...
})
class AuthWidget {}

@Injectable()
class AuthService {}

@Injectable()
class ChatSocket {}

@NgModule({
  declarations[ ChatWidget, AuthWidget ]
  providers: [ AuthService, ChatSocket ],
})
```

Okay, this is starting to look a little bit more complete. Although it's still
unclear how `ChatWidget` is being told about its dependencies.  Perhaps that is
related to those odd `@Injectable` statements.
