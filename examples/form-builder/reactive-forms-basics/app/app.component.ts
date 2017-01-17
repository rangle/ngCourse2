import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  username = new FormControl('')
  password = new FormControl('')
  
  loginForm: FormGroup = this.builder.group({
    username: this.username,
    password: this.password
  });

  constructor (private builder: FormBuilder) { }

  login() {
    console.log(this.loginForm.value);
    // Attempt Logging in...
  }
}