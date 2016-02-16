import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {App} from './containers/app';
import {Unique} from './services/unique';

bootstrap(App, [Unique]);
