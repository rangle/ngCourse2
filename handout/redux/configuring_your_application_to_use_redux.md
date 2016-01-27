## Configuring your Application to use Redux

Once you have the reducers and actions created, it is time to configure your Angular 2 application to make use of ng2-redux. For this, we will need to: -

* Create our application reducer
* Create and configure a store
* Register the provider with Angular 2

### Create our application reducer

__app/reducers/index.ts__
```javascript
import { combineReducers } from 'redux';
import counter from './counter-reducer';

export default  combineReducers({
  counter
});
```

What `combineReducers` does, is allows us to break out our application into smaller reducers with a single area of concern. Each reducer that you pass into it, will become a property on the state. So when we ar subscribing to our state changes with `ngRedux.connect`, we will be passed in a state object with a property counter, and any other reducers you have provided.

### Create and configure a store

When creating a store in redux, this is where you provide the middleware you want to use, and the reducer that you want to have for your application.

__app/store/configure-store.ts__
```javascript
import {createStore, applyMiddleware, compose} from 'redux';
import logger from './configure-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers/index'

let middleware: Array<any> = [thunk, logger];

const finalCreateStore = compose(
  applyMiddleware(...middleware)
)(createStore);

export default () => {
  return finalCreateStore(reducer);
}

```

In this example, we are creating a store that is using the `thunk` middleware, which will allow our actions to return non-JSON objects such as promises, and `redux-logger`, which will add some logging functionality to the application.

### Register the provider with Angular 2

Now that we have created our state reducer, and created a store. We now need to tell Angular 2 to use the provider, so that we will be able to inject `ngRedux` into our components.

__app/boot.ts__
```javascript
import {bootstrap}    from 'angular2/platform/browser'
import {SimpleRedux} from './containers/app-container'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';
import {LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';
import configureStore from './store/configure-store';
import * as ng2redux from 'ng2-redux'
const store = configureStore();

bootstrap(SimpleRedux,
  [ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  ng2redux.provider(store)
]);

```

