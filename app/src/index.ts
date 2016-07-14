import {Component, Inject, provide} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import App from './containers/app';
import {AUTH_PROVIDERS} from './services/auth-service';
import TasksService from './services/tasks-service';
import {provideRouter} from '@angular/router';
import {APP_ROUTES} from './routes/app-routes';

const BASE_STYLES = require('!style!css!postcss!./styles/app.css');

bootstrap(
  App, [
    HTTP_PROVIDERS,
    provideRouter(APP_ROUTES),
    AUTH_PROVIDERS,
    TasksService,
    provide(APP_BASE_HREF, { useValue: '/' })
  ]
);
