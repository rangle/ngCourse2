import {Injectable, provide} from 'angular2/core';
// import {Router} from 'angular2/router';

@Injectable()
export class AuthService {

  // constructor(private _router: Router) {}

  login(user: string, password: string): boolean {
    if (user === 'user' && password === 'pass') {
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }

  logout(): any {
    localStorage.removeItem('username');
    // this._router.navigate(['/Main']);
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLogged(): boolean {
    return this.getUser() !== null;
  }
}

export var AUTH_PROVIDERS: Array<any> = [
  provide(AuthService, {useClass: AuthService})
];
