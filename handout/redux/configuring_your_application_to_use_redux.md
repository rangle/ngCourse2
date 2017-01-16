# Configuring your Application to use Redux #

Once you have the reducers and actions created, it is time to configure your
Angular application to make use of Ng2-Redux. For this, we will need to:

* Register Ng2-Redux with Angular
* Create our application reducer
* Create and configure a store

## Registering Ng2-Redux with Angular

_app/index.ts_
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { SimpleRedux } from './containers/app-container';

@NgModule({
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  declarations: [
    SimpleRedux
  ],
  bootstrap: [ SimpleRedux ]
})
class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
```

Here, we're simply adding the `NgReduxModule` class as an import in our NgModule declaration.

## Create our Application Reducer

_app/reducers/index.ts_
```javascript
import { combineReducers } from 'redux';
import counter from './counter-reducer';

export default combineReducers({
  counter
});
```

`combineReducers` allows us to break out our application into smaller reducers
with a single area of concern. Each reducer that you pass into it will control a
property on the state. So when we are subscribing to our state changes with
Ng2-Redux's `@select` decorator, we are able to select a counter property,
or any other reducers you have provided.

## Create and Configure a Store

Next we want Ng2-Redux to configure our store based on settings we provide.
This should be done once, in the top-level component of your application.

_app/containers/app-container.ts_
```javascript
import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import logger from '../store/configure-logger';
import reducer from '../reducers';

@Component({
  // ...
})
class SimpleRedux {
  constructor(ngRedux: NgRedux) {
    const initialState = {};
    const middleware = [ logger ];
    ngRedux.configureStore(reducer, initialState, middleware);
  }
}
```

In this example we are creating a store that uses the `redux-logger`
middleware, which will add some logging functionality to the application.
