import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: `[confirm]`
})
export class ConfirmDirective {
  @Input('confirm') onConfirmed: Function = () => {};
  
  @HostListener('click', ['$event'])
  confirmFirst() {
    const confirmed = window.confirm('Are you sure you want to do this?');
    
    console.log('confirm was', confirmed);
    
    if(confirmed) {
      this.onConfirmed();
    }
  }
}