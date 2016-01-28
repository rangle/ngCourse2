# Bootstrapping Providers

Calling `bootstrap` also starts the dependency injection system in Angular 2. We won't go over Angular 2's dependency injection system here, that is for another section, instead lets take a look at an example of how to bootstrap your application with application wide providers. 

```js
import {bootstrap} from 'angular2/platform/browser'
import {MyProvider} from './myprovider'
import {MyApp} from './app.component'

bootstrap(MyApp, [MyProvider]);
```

[View Example](http://plnkr.co/edit/KB8W01LadbtqYTODQt39)

<iframe style="width: 100%; height: 600px" src="http://embed.plnkr.co/KB8W01LadbtqYTODQt39" frameborder="0" allowfullscren="allowfullscren"></iframe>

We import our root Component, `MyApp`, `bootstrap`, and a custom Provider, `MyProvider`. When we bootstrap our root Component we can pass in application wide Providers that will be injected to any Component that wants to use them.
