import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {App} from './containers/app';

const randomFactory = () => { return Math.random(); };
const randomDefinition = { useFactory: randomFactory };

bootstrap(App, [provide('Random', randomDefinition)]);
