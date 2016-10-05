# Setting Properties with a Directive

We can use attribute directives to affect the value of properties on the 
host node by using the `@HostBinding` decorator.

The `@HostBinding` decorator allows us to programatically set a property value 
on the directive's host element. It works similarly to a property binding defined 
in a template, except it specifically targets the host element. The binding is 
checked for every change detection cycle, so it can change dynamically if desired.

For example, lets say that we want to create a directive for buttons that
dynamically adds a class when we press on it. That could look something like:

```typescript
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[buttonPress]'
})
export class ButtonPressDirective {
  @HostBinding('attr.role') role = 'button';
  @HostBinding('class.pressed') isPressed: boolean;

  @HostListener('mousedown') hasPressed() {
    this.isPressed = true;
  }
  @HostListener('mouseup') hasReleased() {
    this.isPressed = false;
  }
}
```
Notice that for both use cases of `@HostBinding` we are passing in a string value for which property we want to affect. If we don't supply a string to the decorator, then the name of the class member will be used instead. 

In the first `@HostBinding`, we are statically setting the role attribute to `button`. For the second example, the `pressed` class will be applied when `isPressed` is true.

> _Tip:_ Though less common, `@HostBinding` can also be applied to Components if required.
