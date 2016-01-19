import {Component, View, Inject, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {bootstrap} from 'angular2/bootstrap';
import { HTTP_PROVIDERS } from 'angular2/http';
import App from './containers/app';
import TasksService from './services/tasks-service';
const BASE_STYLES = require('!style!css!postcss!./styles/app.css');

bootstrap(
  App, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    TasksService,
    provide(APP_BASE_HREF, { useValue: '/' })
  ]
);
