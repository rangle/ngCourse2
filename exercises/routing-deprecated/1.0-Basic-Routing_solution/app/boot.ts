import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './containers/app';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {provide} from '@angular/core';
import {LocationStrategy,
        Location,
        HashLocationStrategy} from '@angular/common';

bootstrap(App, [ROUTER_PROVIDERS,
 provide(LocationStrategy, {useClass: HashLocationStrategy})]);
