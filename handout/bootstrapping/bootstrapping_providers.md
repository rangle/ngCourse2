# Bootstrapping Providers

Calling `bootstrap` also starts the dependency injection system in Angular 2.
We won't go over Angular 2's dependency injection system here - that is covered later.
Instead let's take a look at an example of how to bootstrap your application with application-wide providers.

```js
import {bootstrap} from '@angular/platform-browser-dynamic'
import {MyProvider} from './myprovider'
import {App} from './app.component'

bootstrap(MyApp, [MyProvider]);
```

[View Example](https://plnkr.co/edit/gEAfi4PGOel9clqUp6U4?p=preview)

We import our root Component, `App`, `bootstrap` and a custom provider, `MyProvider`.
When we bootstrap our root component we can pass in application-wide providers
that will be injected to any component that wants to use them.
