import {Component} from '@angular/core';
import {FORM_DIRECTIVES, NgForm} from '@angular/common';

@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.component.html',
  directives: [FORM_DIRECTIVES]
})
export class MyForm {
  
  formValue: any;
  
  onSubmit(regForm: NgForm) {
    console.log(regForm);
    console.log(regForm.value);
    this.formValue = regForm.value;
  }
}