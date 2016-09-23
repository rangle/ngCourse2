import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: `[confirm]`
})
export class ConfirmDirective {
  @Input('confirm') onConfirmed: Function = () => {};
  @Input() confirmMessage: string = 'Are you sure you want to do this?';
  
  @HostListener('click', ['$event'])
  confirmFirst() {
    const confirmed = window.confirm(this.confirmMessage);
    
    console.log('confirm was', confirmed);
    
    if(confirmed) {
      this.onConfirmed();
    }
  }
}