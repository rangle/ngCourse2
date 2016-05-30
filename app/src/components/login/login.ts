import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {
  FORM_BINDINGS,
  FORM_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators
} from '@angular/common';
import {AuthService} from '../../services/auth-service';
const TEMPLATE = require('./login.html');

@Component({
  selector: 'login',
  directives: [FORM_DIRECTIVES],
  viewProviders: [FORM_BINDINGS],
  template: TEMPLATE
})
export default class LoginComponent {

  message: string = '';
  loginForm: ControlGroup;

  constructor(
    public authService: AuthService,
    private _builder: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = _builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this._router.navigate(['/Main']);
    }
  }

  login() {
    const values = this.loginForm.value;
    if (!this.authService.login(values.username, values.password)) {
      this.message = 'Incorrect credentials.';
    } else {
      this.message = '';
      this._router.navigate(['/Main']);
    };
  }
}
