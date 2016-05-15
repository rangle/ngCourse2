import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, Location, HashLocationStrategy } from '@angular/common';
import {provide} from '@angular/core';
import {SimpleRouting} from './app.component'

bootstrap(SimpleRouting, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);