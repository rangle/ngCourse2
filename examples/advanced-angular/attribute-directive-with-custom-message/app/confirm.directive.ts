import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: `[appConfirm]`
})
export class ConfirmDirective {
  @Input() appConfirm = () => {};
  
  @Input() confirmMessage = 'Are you sure you want to do this?';
  
  @HostListener('click', ['$event'])
  confirmFirst() {
    const confirmed = window.confirm(this.confirmMessage);
    
    console.log('confirm was', confirmed);
    
    if(confirmed) {
      this.appConfirm());
    }
  }
}