import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {MyProvider} from './myprovider'

bootstrap(AppComponent, [MyProvider]);