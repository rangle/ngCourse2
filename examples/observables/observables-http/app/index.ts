import { bootstrap } from '@angular/platform-browser-dynamic';
import { App } from './app.component.ts';
import { HTTP_PROVIDERS } from '@angular/http';

bootstrap(App, [ HTTP_PROVIDERS ]);