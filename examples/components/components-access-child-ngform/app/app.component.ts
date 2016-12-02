import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  formValue = JSON.stringify({});

  onSubmit (form: NgForm) {
    this.formValue = JSON.stringify(form.value);
  }
}
