# NgStyle Directive

Angular provides a built-in directive, `ngStyle`, to modify a component or element's `style` attribute. Here's an example:


```typescript
@Component({
  selector: 'app-style-example',
  template: `
    <p style="padding: 1rem"
      [ngStyle]="{
        'color': 'red',
        'font-weight': 'bold',
        'borderBottom': borderStyle
      }">
      <ng-content></ng-content>
    </p>
  `
})
export class StyleExampleComponent {
  borderStyle = '1px solid black';
}
```
[View Example](https://plnkr.co/edit/akK3Gw8W6EgUQ4PRQp4h?p=preview)

Notice that binding a directive works the exact same way as component attribute bindings. Here, we're binding an expression, an object literal, to the `ngStyle` directive so the directive name must be enclosed in square brackets. `ngStyle` accepts an object whose properties and values define that element's style. In this case, we can see that both kebab case and lower camel case can be used when specifying a style property. Also notice that both the html `style` attribute and Angular `ngStyle` directive are combined when styling the element.

We can remove the style properties out of the template into the component as a property object, which then gets assigned to `NgStyle` using property binding. This allows dynamic changes to the values as well as provides the flexibility to add and remove style properties.

```typescript
@Component({
  selector: 'app-style-example',
  template: `
    <p style="padding: 1rem"
      [ngStyle]="alertStyles">
      <ng-content></ng-content>
    </p>
  `
})
export class StyleExampleComponent {
  borderStyle = '1px solid black';

  alertStyles = {
    'color': 'red',
    'font-weight': 'bold',
    'borderBottom': this.borderStyle
  };
}
```
