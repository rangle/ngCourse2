import {Directive, HostListener, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: `p[appHighlight]`
})
export class HighlightPDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }
  
  @HostListener('mouseenter', ['$event'])
  handleMouseEnter(event: Event) {
    this.highlight('yellow');
  }
  
  @HostListener('mouseleave', ['$event'])
  handleMouseLeave(event) {
    this.highlight(null);
  }
  
  highlight(color) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
