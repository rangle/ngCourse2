import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './containers/app';
import {provide} from '@angular/core';
import {LocationStrategy,
        Location,
        HashLocationStrategy} from '@angular/common';
import {APP_ROUTER_PROVIDERS} from './routes/app.routes';

bootstrap(App, [
  APP_ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
