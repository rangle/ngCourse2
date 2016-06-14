import {bootstrap} from '@angular/platform-browser-dynamic'
import { provideRouter, RouterConfig } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {provide} from '@angular/core'
import {SimpleRouting} from './app.component'
import ComponentOne from './component-one';
import ComponentTwo from './component-two';
import ComponentThree from './component-three';
/*
@RouteConfig([
  {path: '/componentOne', as: 'ComponentOne', useAsDefault: true, component: ComponentOne},
  {path: '/componentTwo', as: 'ComponentTwo', useAsDefault: false, component: ComponentTwo},
  {path: '/componentThree/:message', as: 'ComponentThree', useAsDefault: false, component: ComponentThree}
  ])*/

const routes: RouterConfig = [
  {path: '/component-one',  useAsDefault: true, component: ComponentOne},
  {path: '/component-two',  useAsDefault: false, component: ComponentTwo},
  {path: '/component-three/:message',  useAsDefault: false, component: ComponentThree}
  ]
bootstrap(SimpleRouting, [provideRouter(routes), provide(LocationStrategy, {useClass: HashLocationStrategy})]);