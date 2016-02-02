import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {AuthService} from './services/auth-service';

@Directive({
  selector: 'loggedin-router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(
    _elementRef: ElementRef,
    _loader: DynamicComponentLoader,
    _parentRouter: Router,
    @Attribute('name') nameAttr: string
  ) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      '/login': true
    };
  }

  activate(instruction: ComponentInstruction) {

    const url = this.parentRouter.lastNavigationAttempt;
    // Replace with AuthService.isLogged();
    const isLoggedIn = false;
    const isPublicRoute = !!this.publicRoutes[url];

    console.log('ComponentInstruction', ComponentInstruction);
    console.log('url', url);
    console.log('isLoggedIn', isLoggedIn);
    console.log('isPublicRoute', isPublicRoute);

    if (!isPublicRoute && !isLoggedIn) {
      console.log("REDIRECT TO LOGIN");
      this.parentRouter.navigateByUrl('/login');
    }
    return super.activate(instruction);
  }
}
