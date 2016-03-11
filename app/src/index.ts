import {Component, View, Inject, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {bootstrap} from 'angular2/bootstrap';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AUTH_PROVIDERS} from './services/auth-service';
import configureStore from './store/configureStore';
import App from './containers/app';
import StateService from './services/state-service';
import TaskActions from './actions/tasks';
import TasksService from './services/tasks-service';
const BASE_STYLES = require('!style!css!postcss!./styles/app.css');
const provider = require('ng2-redux').provider;
const store = configureStore();

bootstrap(
  App, [
    StateService,
    ROUTER_PROVIDERS,
    AUTH_PROVIDERS,
    TaskActions,
    provider(store),
    TasksService,
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' })
  ]
);
