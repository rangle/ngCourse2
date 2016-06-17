import { bootstrap }    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, Location, HashLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common/index';
import { provide } from '@angular/core';
import { SimpleRedux } from './containers/app-container';
import { NgRedux } from 'ng2-redux';

bootstrap(SimpleRedux, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provide(APP_BASE_HREF, { useValue: '/' }),
  NgRedux
]);

