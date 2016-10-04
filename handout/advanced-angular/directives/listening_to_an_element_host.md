# Listening to an Element Host

Listening to the *host* - that is, the DOM element the directive is attached to - is among the primary ways directives extend the component or element's behavior. Previously, we saw its common use case.

```typescript
@Directive({
  selector: '[myDirective]'  
})
class MyDirective {
  @HostListener('click', ['$event'])
  onClick() {}

  @HostListener
}
```

We can also respond to external events, such as from `window` or `document`, by adding the target in the listener.

```typescript
@Directive({
  selector: `[highlight]`
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer) {}
  
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.highlight('yellow');
    } else {
      this.highlight(null);
    }
  }
  
  highlight(color) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
```
[View Example](https://plnkr.co/edit/HXJwSb2zvrhHy0NmBAzb?p=preview)

> Although less common, we can also use `@HostListener` if we'd like to register listeners on the host element.
