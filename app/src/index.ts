import {Component, View, Inject, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {bootstrap} from 'angular2/bootstrap';
import { HTTP_PROVIDERS } from 'angular2/http';
import App from './containers/app';
import Tasks from './services/tasks';
const css = require('!style!css!postcss!./styles/styles.css');

bootstrap(
  App, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    Tasks,
    provide(APP_BASE_HREF, { useValue: '/' })
  ]
);
