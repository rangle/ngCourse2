# Using Router Providers

In order to setup Angular 2's routing service, we need to inject certain routing providers. Routing is a large topic that needs its own section to go over, but lets take a look at a simple example of how to get started with Angular 2's routes using `bootstrap`.  

```js
import {bootstrap} from '@angular/platform-browser-dynamic'
import {ROUTER_PROVIDERS} from '@angular/router-deprecated'
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {provide} from '@angular/core'
import {App} from './app.component'

bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
```

[View Example](https://plnkr.co/edit/c8tiTcT0mso4neVHuN2K?p=preview)

<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/c8tiTcT0mso4neVHuN2K/" frameborder="0" allowfullscren="allowfullscren"></iframe>

Here we have imported `ROUTER_PROVIDERS` as an application wide Provider that can be configured in our root Component. Since we have injected `ROUTER_PROVIDERS` as an application wide Provider, we can also employ useful router directives in any Component we want, thus allowing us to interact with the router at any point in our application. 
