import {bootstrap}    from 'angular2/platform/browser';
import {App} from './containers/app';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';
import {LocationStrategy, 
        Location, 
        HashLocationStrategy} from 'angular2/router';

bootstrap(App, [ROUTER_PROVIDERS,
 provide(LocationStrategy, {useClass: HashLocationStrategy})]);