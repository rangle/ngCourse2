import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

export class DelayContext {
  constructor(private loadTime: number) { }
}

@Directive({
  selector: '[delay]'
})
export class DelayDirective {
  constructor(
    private templateRef: TemplateRef<DelayContext>,
    private viewContainerRef: ViewContainerRef
  ) { }
  
  @Input('delay')
  set delayTime(time: number): void {
    setTimeout(
      () => {
        this.viewContainerRef.createEmbeddedView(
          this.templateRef, 
          new DelayContext(performance.now())
        );
      },
      time);
  }
}