import { provideRouter, RouterConfig } from '@angular/router';
import UserDetail from '../components/user-detail';
import UserList from '../components/user-list';
import CompanyList from '../components/company-list';
import Home from '../components/home';


export const routes: RouterConfig = [
  {path: '', component: Home},
  {path: 'users', component: UserList},
  {path: 'companies', component: CompanyList},
  {path: 'users/:id', component: UserDetail}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];