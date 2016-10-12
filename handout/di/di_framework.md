# DI Framework

So there's a fancy new `ChatApp` class that is easy to test, but it's
currently awkward to work with.  Instantiating a `ChatApp` requires:

```js
const chatApp = new ChatApp(new AuthService(['Google']), new AuthWidget('Normal'), new ChatWidget(false));
```

That's a lot of work to create a `ChatApp`, and now all the different pieces
of code that make `ChatApp`s have to understand how `AuthService`, `AuthWidget` and
`ChatWidget` get instantiated.

One approach to dealing with this new problem might be to make a factory
function like so:

```js
function chatAppFactory() {
    const authService = new AuthService(['Google']);
    const authWidget = new AuthWidget('Normal');
    const chatWidget = new ChatWidget(false);
    return new ChatApp(authService, authWidget, chatWidget);
}
```

This is an improvement, but when the `ChatApp` get more complex,
this factory will become confusing.  The factory is also responsible for
knowing how to create four different components.  This is a lot for one
function.

This is where a dependency injection framework can help.  DI Frameworks
have the concept of an `Injector` object.  An Injector is a lot like
the factory function above, but more general, and powerful.  Instead of one
giant factory function, an Injector has a factory, or _recipe_ (pun intended)
for a collection of objects.  With an `Injector`, creating a `ChatApp` could be
as easy as:

```js
const injector = new Injector([ChatApp, AuthService, AuthWidget, ChatWidget]);
const chatApp = injector.get(ChatApp);
```
