# Creating a Structural Directive

We'll create a `delay` structural directive that delays instantiation of a component or element. This can potentially be used for cosmetic effect or for manually handling timing of when components are loaded, either for performance or UX.

```typescript
@Directive({
  selector: '[delay]'
})
export class DelayDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }
  
  @Input('delay')
  set delayTime(time: number): void { }
}
```
[View Example](https://plnkr.co/edit/LUyMxmGtYYXCPZZgqpZp?p=preview)

We use the same `@Directive` class decorator as attribute directives and define a selector in the same way. One big difference here is that due the nature of structural directives being bound to a template, we have access to `TemplateRef`, an object representing the `template` tag the directive is attached to. We also add an input property in a similar way, but this time with a `set` handler so we can execute some code when the Angular 2 performs the binding. We bind `delay` in exactly the same way as the Angular 2 built-in structural directives.

```typescript
@Component({
  selector: 'app',
  directives: [CardComponent,DelayDirective],
  template: `
    <template ngFor [ngForOf]="[1,2,3,4,5,6]" let-item>
      <card *delay="500 * item">
        {{item}}
      </card>
    </template>
  `
  
})
export class App {
}
```
[View Example](https://plnkr.co/edit/LUyMxmGtYYXCPZZgqpZp?p=preview)

Notice that no content is being rendered however. This is due to Angular 2 simulating the html `template` tag and not rendering any child elements by default. To be able to get this content to render, we'll have to attach the template given by `TemplateRef` as an *embedded view* to a *view container*.