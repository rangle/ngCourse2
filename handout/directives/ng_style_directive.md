# NgStyle Directive

Angular 2 provides a built-in directive, `ngStyle`, to modify a component or element's `style` attribute. Here's an example:


```typescript
@Component({
  selector: 'style-example',
  template: `
    <p  style="padding: 1rem"
        [ngStyle]="{ 
            color: 'red',
            'font-weight': 'bold',
            borderBottom: borderStyle
        }">
        <ng-content></ng-content>
    </p>
  `
})
export class StyleExampleComponent {
  borderStyle: string = '1px solid black';
}
```
[View Example](https://plnkr.co/edit/rTNmetnnehENXL3Ungch?p=preview)

Notice that binding a directive works the exact same way as component attribute bindings. Here, we're binding an expression, an object literal, to the `ngStyle` directive so the directive name must be enclosed in square brackets. `ngStyle` accepts an object whose properties and values define that element's style. In this case, we can see that both kebab case and lower camel case can be used when specifying a style property. Also notice that both the html `style` attribute and Angular 2 `ngStyle` directive are combined when styling the element.