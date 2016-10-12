# DI Framework

So there's a fancy new `ChatWidget` class that is easy to test, but it's
currently awkward to work with.  Instantiating a `ChatWidget` requires:

```js
const chatWidget = new ChatWidget(new AuthService(['Google']), new AuthWidget('Normal'), new ChatSocket(true));
```

That's a lot of work to create a `ChatWidget`, and now all the different pieces
of code that make `ChatWidget` have to understand how `AuthService`, `AuthWidget` and
`ChatSocket` get instantiated.

One approach to dealing with this new problem might be to make a factory
function like so:

```js
function chatWidgetFactory() {
    const authService = new AuthService(['Google']);
    const authWidget = new AuthWidget('Normal');
    const chatSocket = new ChatSocket(true);
    return new ChatWidget(authService, authWidget, chatSocket);
}
```

This is an improvement, but when the `ChatWidget` gets more complex,
this factory will become confusing.  The factory is also responsible for
knowing how to create four different components, which is a lot for one
function.

This is where a dependency injection framework can help.  DI Frameworks
have the concept of an `Injector` object.  An Injector is a lot like
the factory function above, but more general, and powerful.  Instead of one
giant factory function, an Injector has a factory, or _recipe_ (pun intended)
for a collection of objects.  With an `Injector`, creating a `ChatWidget` could be
as easy as:

```js
const injector = new Injector([ChatWidget, AuthService, AuthWidget, ChatSocket]);
const chatApp = injector.get(ChatWidget);
```
