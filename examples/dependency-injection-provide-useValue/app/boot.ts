import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {App} from './containers/app';

const randomDefinition = { useValue: Math.random() };

bootstrap(App, [provide('Random', randomDefinition)]);
