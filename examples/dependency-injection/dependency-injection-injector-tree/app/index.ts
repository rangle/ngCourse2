import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {App} from './app.component.ts';
import {Unique} from './services/unique';

bootstrap(App, [Unique]);