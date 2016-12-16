import {Directive, HostListener, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: `div[appHighlight]`
})
export class HighlightDivDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }
  
  @HostListener('mouseenter', ['$event'])
  handleMouseEnter(event: Event) {
    this.highlight('bold');
  }
  
  @HostListener('mouseleave', ['$event'])
  handleMouseLeave(event) {
    this.highlight('normal');
  }
  
  highlight(weight) {
    this.renderer.setElementStyle(this.el.nativeElement, 'font-weight', weight);
  }
}
