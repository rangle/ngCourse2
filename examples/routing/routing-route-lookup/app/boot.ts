import {bootstrap}    from 'angular2/platform/browser'
import {SimpleRouting} from './app.component'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';
import {LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';
bootstrap(SimpleRouting,[ROUTER_PROVIDERS,
 provide(LocationStrategy, {useClass: HashLocationStrategy})]);