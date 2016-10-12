# What is DI?

So dependency injection makes programmers' lives easier, but what does it
_really_ do?

Consider the following code:

```js
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;
  constructor() {
    this.authService = new AuthService(['Facebook', 'Google', 'Github']);
    this.authWidget = new AuthWidget('Normal'); //Create a normal size auth widget
    this.chatSocket = new ChatSocket(true); //Create a chat socket with encryption
  }
}

```

The above code is a contrived class that represents a chat widget we would like to build.  The class
assumes a `ChatWidget` consists of a `AuthService`, `AuthWidget` and `ChatSocket`.  The class
is also responsible for _making_ the `AuthService`, `AuthWidget` and `ChatSocket`.  This is a
bad thing. What if a chat app that accepts `Linkedin` account were needed?  One naive approach might
be:

```js
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;
  constructor() {
    this.authService = new AuthService(['Facebook', 'Google', 'Github', 'Linkedin']);
    this.authWidget = new AuthWidget('Normal');
    this.chatSocket = new ChatSocket(true);
  }
}
```

There, problem solved right? But what if we need a smaller auth widget?
What if we want to turn off encryption... maybe something more generic like:

```js
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;
  constructor(authServiceType: string[], authWidgetSize: string, chatSocketEncryption: boolean) {
    this.authService = new AuthService(authServiceType);
    this.authWidget = new AuthWidget(authWidgetSize);
    this.chatSocket = new ChatSocket(chatSocketEncryption);
  }
}
```

Okay this is a little different, and it's more flexible in some ways, but it is
still quite brittle.  What would happen if the `ChatSocket` constructor changed to
allow for new features?  The whole `ChatWidget` class would have to be updated.
In fact, any time any of these constructors used in `ChatWidget`'s constructor
are changed, `ChatWidget` would also have to be changed.

Also, what happens during testing? How can `AuthService`, `AuthWidget` and `ChatSocket` be
effectively mocked?

Taking those concerns into consideration, the class could be rewritten as:

```js
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;
  constructor(authService: AuthService, authWidget: AuthWidget, chatSocket: ChatSocket) {
    this.authService = authService;
    this.authWidget = authWidget;
    this.chatSocket = chatSocket;
  }
}
```

Now when `ChatWidget` is instantiated it does not need to know anything about its
`AuthService`, `AuthWidget`, or `ChatSocket`.  The construction of these elements has been
moved out of the class.  This pattern is so common that TypeScript allows it to
be written in shorthand like so:

```ts
class ChatWidget {
  constructor(private authService: AuthService, private authWidget: AuthWidget, private chatSocket: ChatSocket) {}
}
```


The `ChatWidget` class is now simpler and easier to test.  This model of having
the dependencies provided to `ChatWidget` is basic dependency injection.

However there is still a problem.  How can the instantiation of `AuthService`,
`AuthWidget` and `ChatSocket` best be managed?

This is where dependency injection as a _framework_ can benefit programmers, and
it is what Angular 2 provides with its dependency injection system.
