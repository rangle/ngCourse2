import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {
FORM_BINDINGS,
FORM_DIRECTIVES,
ControlGroup,
FormBuilder,
Validators
} from 'angular2/common';
import AuthService from '../../services/auth-service';
import LoginForm from '../../components/login-form/login-form';
const TEMPLATE = require('./login.html');

@Component({
  selector: 'login',
  directives: [LoginForm],
  template: TEMPLATE
})
export default class Login {

  message: string = '';


  constructor(
    public authService: AuthService,

    private _router: Router
  ) {

  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this._router.navigate(['/Main']);
    }
  }

  login(userDetails) {
    
    if (!this.authService.login(userDetails.username, userDetails.password)) {
      this.message = 'Incorrect credentials.';
    } else {
      this.message = '';
      this._router.navigate(['/Main']);
    };
  }
}
