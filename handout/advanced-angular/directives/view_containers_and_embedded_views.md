# View Containers and Embedded Views

View Containers are containers where one or more *Views* can be attached. Views represent some sort of layout to be rendered and the context under which to render it. View containers are anchored to components and are responsible for generating its output so this means that changing which views are attached to the view container affect the final rendered output of the component. 

Two types of views can be attached to a view container: *Host Views* which are linked to a *Component*, and *Embedded Views* which are linked to a *template*. Since structural directives interact with templates, we are interested in using *Embedded Views* in this case.

```typescript
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[delay]'
})
export class DelayDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }
  
  @Input('delay')
  set delayTime(time: number): void {
    setTimeout(
      () => {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      },
      time);
  }
}
```
[View Example](https://plnkr.co/edit/dc9sCOeAKF3iLXEEQvkR?p=preview)

Directives get access to the view container by injecting a `ViewContainerRef`. Embedded views are created and attached to a view container by calling the `ViewContainerRef`'s `createEmbeddedView` method and passing in the template. We want to use the template our directive is attached to so we pass in the injected `TemplateRef`.