import {Component, View, Inject} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import configureStore from './store/configureStore';
import App from './containers/app';
const provider = require('ng2-redux').provider;
const store = configureStore();

bootstrap(
  App,
  [
    provider(store)

  ]
);
