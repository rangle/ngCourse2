import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {bootstrap} from 'angular2/bootstrap';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AUTH_PROVIDERS} from './services/auth-service';
import configureStore from './store/configureStore';  
import App from './containers/app';
const BASE_STYLES = require('!style!css!postcss!./styles/app.css');
const provider = require('ng2-redux').provider;
const store = configureStore();

bootstrap(
  App, [
    ROUTER_PROVIDERS,
    AUTH_PROVIDERS,
    provider(store),
    provide(APP_BASE_HREF, { useValue: '/' })
  ]
);
