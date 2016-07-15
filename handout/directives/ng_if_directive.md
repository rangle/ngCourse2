# NgIf Directive

The `ngIf` directive conditionally renders components or elements based on whether or not an expression is true or false.

Here's our app component, where we bind the `ngIf` directive to an example component.

```typescript
@Component({
  selector: 'app',
  directives: [IfExampleComponent],
  template: `
    <button type="button" (click)="toggleExists()">Toggle Component</button>
    <hr/>
    <if-example *ngIf="exists">
      Hello
    </if-example>
  `
})
export class AppComponent {
  exists: boolean = true;
  
  toggleExists() {
    this.exists = !this.exists;
  }
}
```
[View Example](https://plnkr.co/edit/fe1drmczwhn54ypeDIv3?p=preview)

Clicking the button will toggle whether or not `IfExampleComponent` is a part of the DOM and not just whether it is visible or not. This means that every time the button is clicked, `IfExampleComponent` will be created or destroyed. This can be an issue with components that have an expensive create/destroy actions. For example, a component could have a large child subtree or make several HTTP calls when constructed. In these cases it may be better to avoid using `ngIf` if possible.