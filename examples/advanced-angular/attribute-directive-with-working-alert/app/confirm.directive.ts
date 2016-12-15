import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {
  @Input() appConfirm = () => {};

  @HostListener('click', ['$event'])
  confirmFirst() {
    const confirmed = window.confirm('Are you sure you want to do this?');
    
    if(confirmed) {
      this.appConfirm();
    }
  }
}