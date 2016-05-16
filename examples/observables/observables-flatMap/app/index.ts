import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_BINDINGS} from '@angular/http'
import {App} from './app.component';
import {SearchService} from './services/search.service'


bootstrap(App, [HTTP_BINDINGS, SearchService]);