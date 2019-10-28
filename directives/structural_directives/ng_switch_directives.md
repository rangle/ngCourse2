# NgSwitch Directives

`ngSwitch` is actually comprised of two directives, an attribute directive and a structural directive. It's very similar to a [switch statement](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/switch) in JavaScript and other programming languages, but in the template.

```typescript
@Component({
  selector: 'app-root',
  template: `
    <div class="tabs-selection">
      <app-tab [active]="isSelected(1)" (click)="setTab(1)">Tab 1</app-tab>
      <app-tab [active]="isSelected(2)" (click)="setTab(2)">Tab 2</app-tab>
      <app-tab [active]="isSelected(3)" (click)="setTab(3)">Tab 3</app-tab>
    </div>

    <div [ngSwitch]="tab">
      <app-tab-content *ngSwitchCase="1">Tab content 1</app-tab-content>
      <app-tab-content *ngSwitchCase="2">Tab content 2</app-tab-content>
      <app-tab-content *ngSwitchCase="3"><app-tab-3></app-tab-3></app-tab-content>
      <app-tab-content *ngSwitchDefault>Select a tab</app-tab-content>
    </div>
  `
})
export class AppComponent {
  tab: number = 0;

  setTab(num: number) {
    this.tab = num;
  }

  isSelected(num: number) {
    return this.tab === num;
  }
}
```

[View Example](https://plnkr.co/edit/QWxD0DIZi6QiISafwfgu?p=preview)

Here we see the `NgSwitch` attribute directive (`ngSwitch`) being attached to an element. This expression bound to the directive defines what will compared against in the switch structural directives. If an expression bound to `ngSwitchCase` matches the one given to `ngSwitch`, those components are created and the others destroyed. If none of the cases match, then components that have `ngSwitchDefault` bound to them will be created and the others destroyed. Note that multiple components can be matched using `ngSwitchCase` and in those cases all matching components will be created. Since components are created or destroyed, be aware of the costs in doing so.

