import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {App} from './app.component.ts';

const randomFactory = () => { return Math.random(); };
const randomDefinition = { useFactory: randomFactory };

bootstrap(App, [provide('Random', randomDefinition)]);
