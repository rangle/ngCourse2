import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app.component.ts';
import {MyProvider} from './myprovider'

bootstrap(App, [MyProvider]);