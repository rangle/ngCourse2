import { provideRouter, RouterConfig } from '@angular/router';
import UserDetail from '../components/user-detail';
import UserList from '../components/user-list';
import CompanyList from '../components/company-list';
import Home from '../components/home';


export const routes: RouterConfig = [
  /*
    Complete the Route Config Definition for:
      * /users - Route to the UsersList component
      * /company - Route to the Company List Component
      * /  - Default route, for the Home component
  */
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];