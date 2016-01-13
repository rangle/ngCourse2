import {Component, View, Inject} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import configureStore from './store/configureStore';
import App from './containers/app';
const provider = require('ng2-redux').provider;
const store = configureStore();
const css = require('!style!css!postcss!./styles/styles.css');

bootstrap(
  App, [
    provider(store)
  ]
);
