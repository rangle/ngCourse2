# Using Router Providers

In order to setup Angular 2's routing service, we need to inject certain routing providers. Routing is a large topic that needs its own section to go over, but lets take a look at a simple example of how to get started with Angular 2's routes using `bootstrap`.  

```js
import {bootstrap} from 'angular2/platform/browser'
import {ROUTE_PROVIDERS} from 'angular2/router'
import {LocationStrategy, HashStrategyLocation} from 'angular2/router'
import {provide} from 'angular2/core'
import {MyApp} from './app.component'

bootstrap(MyApp, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
```

[View Example](http://plnkr.co/edit/xZLEIX601g0TqsEOyB8y)

<iframe style="width: 100%; height: 600px" src="http://embed.plnkr.co/xZLEIX601g0TqsEOyB8y" frameborder="0" allowfullscren="allowfullscren"></iframe>

Here we have imported `ROUTER_PROVIDERS` as an application wide Provider that can be configured in our root Component. Since we have injected `ROUTER_PROVIDERS` as an application wide Provider, we can also employ useful router directives in any Component we want, thus allowing us to interact with the router at any point in our application. 
