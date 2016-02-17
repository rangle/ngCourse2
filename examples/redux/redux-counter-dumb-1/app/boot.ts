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

