# NgIf Directive

The `ngIf` directive conditionally adds or removes content from the DOM based on whether or not an expression is *true* or *false*.

Here's our app component, where we bind the `ngIf` directive to an example component.

```typescript
@Component({
  selector: 'app-root',
  template: `
    <button type="button" (click)="toggleExists()">Toggle Component</button>
    <hr>
    <app-if-example *ngIf="exists">
      Hello
    </app-if-example>
  `
})
export class AppComponent {
  exists = true;

  toggleExists() {
    this.exists = !this.exists;
  }
}
```

[View Example](https://plnkr.co/edit/Kb0KW89265F0e9pYJ118?p=preview)

Clicking the button will toggle whether or not `IfExampleComponent` is a part of the DOM, as opposed to just whether it is visible or not. This means that every time the button is clicked, `IfExampleComponent` will be created or destroyed. This can be an issue with components that have expensive create/destroy actions. For example, a component could have a large child subtree or make several HTTP calls when constructed. In these cases it may be better to avoid using `ngIf` if possible.

Alternatively, components that are simply hidden still has event listeners attached to the DOM and Angular will continue to check those components for changes that may affect data bindings. Although the component is hidden, it is still in memory and treated like any other component attached to the DOM. 

