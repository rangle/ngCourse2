import {bootstrap}    from 'angular2/platform/browser';
import App from './app-component';
import {HTTP_BINDINGS} from 'angular2/http';
import SearchService from './search-service';

bootstrap(App, [HTTP_BINDINGS, SearchService]);
