import {provide} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic'
import {LocationStrategy, Location, HashLocationStrategy } from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {SimpleRouting} from './app.component'

bootstrap(SimpleRouting, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);