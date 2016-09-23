import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: `[confirm]`
})
export class ConfirmDirective {
  @HostListener('click', ['$event'])
  confirmFirst(event: Event) {
    const confirmed = window.confirm('Are you sure you want to do this?');
    
    console.log('confirmed as', confirmed);
    
    return confirmed;
  }
}