import { provideRouter, RouterConfig } from '@angular/router';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';
import ChildOne from './child-one';
import ChildTwo from './child-two';

export const routes: RouterConfig = [
  { path: '', redirectTo: 'component-one', pathMatch: 'full' },
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo,
    children: [
      { path: '', redirectTo: 'child-one', pathMatch: 'full' },
      { path: 'child-one', component: ChildOne },
      { path: 'child-two', component: ChildTwo }
    ]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];