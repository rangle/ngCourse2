# What is DI?

So dependency injection makes programmers' lives easier, but what does it
_really_ do?

Consider the following code:

```js
class ChatApp {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatWidget: ChatWidget;
  constructor() {
    this.authService = new AuthService(['Facebook', 'Google', 'Github']);
    this.authWidget = new AuthWidget('Normal'); //Create a normal size auth widget
    this.chatWidget = new ChatWidget(false); //Create a chat widget without encryption
  }
}

```

The above code is a contrived class that represents a chat app we would like to build.  The class
assumes a `ChatApp` consists of a `AuthService`, `AuthWidget` and `ChatWidget`.  The class
is also responsible for _making_ the `AuthService`, `AuthWidget` and `ChatWidget`.  This is a
bad thing. What if a chat app that accepts `Linkedin` account were needed?  One naive approach might
be:

```js
class ChatApp {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatWidget: ChatWidget;
  constructor() {
    this.authService = new AuthService(['Facebook', 'Google', 'Github', 'Linkedin']);
    this.authWidget = new AuthWidget('Normal');
    this.chatWidget = new ChatWidget(false);
  }
}
```

There, problem solved right? But what if we need a smaller auth widget?
What if we want to turn on encryption... maybe something more generic like:

```js
class ChatApp {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatWidget: ChatWidget;
  constructor(authServiceType: string[], authWidgetSize: string, chatWidgetEncryption: boolean) {
    this.authService = new AuthService(authServiceType);
    this.authWidget = new AuthWidget(authWidgetSize);
    this.chatWidget = new ChatWidget(chatWidgetEncryption);
  }
}
```

Okay this is a little different, and it's more flexible in some ways, but it is
still quite brittle.  What would happen if the `ChatWidget` constructor changed to
allow for new features?  The whole `ChatApp` class would have to be updated.
In fact, any time any of these constructors used in `ChatApp`'s constructor
are changed, `ChatApp` would also have to be changed.

Also, what happens during testing? How can `AuthService`, `AuthWidget` and `ChatWidget` be
effectively mocked?

Taking those concerns into consideration, the class could be rewritten as:

```js
class ChatApp {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatWidget: ChatWidget;
  constructor(authService: AuthService, authWidget: AuthWidget, chatWidget: ChatWidget) {
    this.authService = authService;
    this.authWidget = authWidget;
    this.chatWidget = chatWidget;
  }
}
```

Now when `ChatApp` is instantiated it does not need to know anything about its
`AuthService`, `AuthWidget`, or `ChatWidget`.  The construction of these elements has been
moved out of the class.  This pattern is so common that TypeScript allows it to
be written in shorthand like so:

```ts
class ChatApp {
  constructor(private authService: AuthService, private authWidget: AuthWidget, private chatWidget: ChatWidget) {}
}
```


The `ChatApp` class is now simpler and easier to test.  This model of having
the dependencies provided to `ChapApp` is basic dependency injection.

However there is still a problem.  How can the instantiation of `AuthService`,
`AuthWidget` and `ChatWidget` best be managed?

This is where dependency injection as a _framework_ can benefit programmers, and
it is what Angular 2 provides with its dependency injection system.
