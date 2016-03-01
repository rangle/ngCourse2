import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {
FORM_BINDINGS,
FORM_DIRECTIVES,
ControlGroup,
FormBuilder,
Validators
} from 'angular2/common';
import AuthService from '../../services/auth-service';
const TEMPLATE = require('./login-form.html');

declare interface ILoginRequest {
  username: string,
  password: string
};

@Component({
  selector: 'login-form',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  template: TEMPLATE
})
export default class LoginForm {

  @Input() message: string = '';
  @Output() onLogin: EventEmitter<ILoginRequest> = new EventEmitter<ILoginRequest>();
  loginForm: ControlGroup;

  constructor(

    private _builder: FormBuilder

  ) {
    this.loginForm = _builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(loginForm) {
    this.onLogin.emit(this.loginForm.value);

  }
}
