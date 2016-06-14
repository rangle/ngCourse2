import {bootstrap} from '@angular/platform-browser-dynamic'

import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {provide} from '@angular/core'
import {SimpleRouting} from './app.component'
import { provideRouter, RouterConfig } from '@angular/router';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';

const routerConfig: RouterConfig =
[
  {path: '/component-one', useAsDefault: true, component: ComponentOne},
  {path: '/component-two', useAsDefault: false, component: ComponentTwo}
] 
bootstrap(SimpleRouting, [
  provideRouter(routerConfig),
  provide(LocationStrategy, {useClass: HashLocationStrategy})
  ]);