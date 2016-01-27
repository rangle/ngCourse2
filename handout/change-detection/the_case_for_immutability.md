## The case for Immutability

One of the more difficult things to manage when structuring an application is managing its state. This is especially true when your application can execute code asynchronously. You execute some piece of code, but something causes it to wait (such as an HTTP request or user input), but when it completes the state it's expecting changed while it was waiting because some other function was executed asynchronously and changed its value.

Dealing with that kind of behavior on a small scale might be manageable, but this can appear all over an application and can be a real headache as the application gets bigger with more interactions and more complex logic.

Immutability attempts to solve this by making sure that any object that's been referenced in one part of the code can't all of a sudden be changed by another part of the code unless they have the ability to rebind it directly.
