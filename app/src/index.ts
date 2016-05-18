import {Component, Inject, provide} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {bootstrap} from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import App from './containers/app';
import {AUTH_PROVIDERS} from './services/auth-service';
import TasksService from './services/tasks-service';

const BASE_STYLES = require('!style!css!postcss!./styles/app.css');

bootstrap(
  App, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    AUTH_PROVIDERS,
    TasksService,
    provide(APP_BASE_HREF, { useValue: '/' })
  ]
);
