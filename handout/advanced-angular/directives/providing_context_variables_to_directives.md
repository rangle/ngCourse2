# Providing Context Variables to Directives

Suppose we want to record some metadata on how our directive affected components and make this data available to them. For example, in our `delay` directive, we're making a `setTimeout` call, which in JavaScript's single-threaded asynchronous model means that it may not run after the exact time we provided. We'll capture the exact time it loads and make that variable available in the template.

```typescript
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
```
[View Example](https://plnkr.co/edit/GT88r0syO2lJJLkXVB8w?p=preview)

We've made a few changes to our `delay` directive. We've created a new `DelayContext` class that contains the context that we want to provide to our directive. In this case, we want to capture the actual time the `createEmbeddedView` call occurs and make that available as `loadTime` in our directive. We've also provided our new class as the generic argument to the `TemplateRef` function. This enables static analysis and lets us make sure our calls to `createEmbeddedView` pass in a variable of type `DelayContext`. In our `createEmbeddedView` call we pass in our variable which has captured the time of the method call. 

In the component using `delay`, we access the `loadTime` context variable in the same way we access variables in `ngFor`.

```typescript
@Component({
  selector: 'app',
  directives: [CardComponent,DelayDirective],
  template: `
    <template ngFor [ngForOf]="[1,2,3,4,5,6]" let-item>
      <card *delay="500 * item; let loaded = loadTime">
        <div class="main">{{item}}</div>
        <div class="sub">{{loaded | number:'1.4-4'}}</div>
      </card>
    </template>
  `
})
```
[View Example](https://plnkr.co/edit/GT88r0syO2lJJLkXVB8w?p=preview)