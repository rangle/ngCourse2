import { provideRouter, RouterConfig } from '@angular/router';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';


export const routes: RouterConfig = [
  { path: '', redirectTo: 'component-one', pathMatch: 'full' },
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two/:id', component: ComponentTwo }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];