# The Case for Immutability

One of the more difficult things to manage when structuring an application is managing its state. This is especially true when your application can execute code asynchronously. Let's say you execute some piece of code, but something causes it to wait (such as an http request or user input). After it's completed, you notice the state it's expecting changed because some other piece of code executed asynchronously and changed its value.

Dealing with that kind of behaviour on a small scale might be manageable, but this can show up all over an application and can be a real headache as the application gets bigger with more interactions and more complex logic.

Immutability attempts to solve this by making sure that any object referenced in one part of the code can't be changed by another part of the code unless they have the ability to rebind it directly.
