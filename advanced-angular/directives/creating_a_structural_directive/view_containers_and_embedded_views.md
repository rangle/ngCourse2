# View Containers and Embedded Views

View Containers are containers where one or more _Views_ can be attached. Views represent some sort of layout to be rendered and the context under which to render it. View containers are anchored to components and are responsible for generating its output so this means that changing which views are attached to the view container affect the final rendered output of the component.

Two types of views can be attached to a view container: _Host Views_ which are linked to a _Component_, and _Embedded Views_ which are linked to a _template_. Since structural directives interact with templates, we are interested in using _Embedded Views_ in this case.

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]'
})
export class DelayDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  @Input()
  set appDelay(time: number): void {
    setTimeout(
      () => {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      },
      time);
  }
}
```

[View Example](https://plnkr.co/edit/UIyFaG6VyHeeGlCKM76L?p=preview)

Directives get access to the view container by injecting a `ViewContainerRef`. Embedded views are created and attached to a view container by calling the `ViewContainerRef`'s `createEmbeddedView` method and passing in the template. We want to use the template our directive is attached to so we pass in the injected `TemplateRef`.

