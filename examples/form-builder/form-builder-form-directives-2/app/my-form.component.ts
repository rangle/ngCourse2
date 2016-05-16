import {Component, NgForm} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.component.html',
  directives: [FORM_DIRECTIVES]
})
export class MyForm {
  
  formValue: any;
  
  onSubmit(regForm: NgForm) {
    this.formValue = regForm.value;
  }
}