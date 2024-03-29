# Directive Duplications

Because we no longer define every component and directive directly in every component that needs it, we need to be aware of how Angular modules handle directives and components that target the same element \(have the same selector\).

Let's assume for a moment that by mistake, we have created two directives that target the same property:

_blue-highlight.directive.ts_

```javascript
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class BlueHighlightDirective {
  constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'blue');
    renderer.setElementStyle(el.nativeElement, 'color', 'gray');
  }
}
```

_yellow-highlight.directive.ts_

```javascript
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class YellowHighlightDirective {
  constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
  }
}
```

These two directives are similar, they are trying to style an element. The `BlueHighlightDirective` will try to set the background color of the element to blue while changing the color of the text to gray, while the `YellowHighlightDirective` will try only to change the background color to yellow. Notice that both are targeting any HTML element that has the property `appHighlight`. What would happen if we add both directives to the same module?

_app.module.ts_

```javascript
// Imports

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    BlueHighlightDirective,
    YellowHighlightDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Let's see how we would use it in the only component of the module.

_app.component.ts_

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1 appHighlight>My Angular App</h1>'
})
export class AppComponent {}
```

We can see that in the template of our component, we are using the directive `appHighlight` in our `h1` element but, which styles are going to end up being applied?

The answer is: the text is going to be gray and the background yellow.

We are allowed to define multiple directives that target the same elements in the same module. What's going to happen is that Angular is going to do every transformation **in order**.

```javascript
declarations: [
  ...,
  BlueHighlightDirective,
  YellowHighlightDirective
]
```

Because we have defined both directives in an array, and **arrays are ordered collection of items**, when the compiler finds an element with the property `appHighlight`, it will first apply the transformations of `BlueHighlightDirective`, setting the text gray and the background blue, and then will apply the transformations of `YellowHighlightDirective`, changing again the background color to yellow.

In summary, **when two or more directives target the same element, they are going to be applied in the order they were defined**.

