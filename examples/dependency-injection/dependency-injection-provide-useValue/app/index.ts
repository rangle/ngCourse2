import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {App} from './app.component.ts';


const randomDefinition = { useValue: Math.random() };

bootstrap(App, [provide('Random', randomDefinition)]);