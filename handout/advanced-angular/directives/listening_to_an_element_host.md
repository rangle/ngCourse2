# Listening to an Element Host

Listening to the *host* - that is, the DOM element the directive is attached to - is among the primary ways directives extend the component or element's behavior. Previously, we saw its common use case.

```typescript
@Directive({
  selector: '[myDirective]'  
})
class MyDirective {
  @HostListener('click', ['$event'])
  onClick() {}

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

> Although less common, we can also use `@HostListener` if we'd like to register listeners on the host element of a Component.

## Host Elements

The concept of a host element applies to both directives and components. 

For a directive, the concept is fairly straight forward. Whichever template tag you place your directive attribute on is considered the host element. If we were implementing the `HighlightDirective` above like so:

```html
<div>
  <p highlight>
    <span>Text to be highlighted</span>
  </p>
</div>
```

The `<p>` tag would be considered the host element. If we were using a custom `TextBoxComponent` as the host, the code would look like this:

```html
<div>
  <my-text-box highlight>
    <span>Text to be highlighted</span>
  </my-text-box>
</div>
```

In the context of a Component, the host element is the tag that you create through the `selector` string in the component configuration. For the `TextBoxComponent` in the example above, the host element in the context of the component class would be the `<my-text-box>` tag.
