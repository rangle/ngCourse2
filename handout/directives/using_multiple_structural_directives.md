# Using Multiple Structural Directives

Sometimes we'll want to combine multiple structural directives together, like iterating using `ngFor` but wanting to do an `ngIf` to make sure that the value matches some or multiple conditions. Combining structural directives can lead to unexpected results however, so Angular 2 requires that a template can only be bound to one directive at a time. To apply multiple directives we'll have to expand the sugared syntax or nest template tags.


```typescript
@Component({
  selector: 'app',
  template: `
    <template ngFor [ngForOf]="[1,2,3,4,5,6]" let-item>
      <div *ngIf="item > 3">
        {{item}}
      </div>
    </template>
  `
})
```
[View Example](https://plnkr.co/edit/gmIbP6s7S1pN7vDk9YHG?p=preview)

The previous tabs example can use `ngFor` and `ngSwitch` if the tab title and content is abstracted away into the component class.

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div class="tabs-selection">
      <tab
        *ngFor="let tab of tabs; let i = index"
        [active]="isSelected(i)"
        (click)="setTab(i)">

        {{ tab.title }}
      </tab>
    </div>

    <div [ngSwitch]="tabNumber">
      <template ngFor [ngForOf]="tabs" let-tab let-i="index">
        <tab-content *ngSwitchCase="i">
          {{tab.content}}
        </tab-content>
      </template>
      <tab-content *ngSwitchDefault>Select a tab</tab-content>
    </div>
  `
})
export class AppComponent {
  tabNumber: number = -1;
  
  tabs = [
    { title: 'Tab 1', content: 'Tab content 1' },
    { title: 'Tab 2', content: 'Tab content 2' },
    { title: 'Tab 3', content: 'Tab content 3' },
  ];

  setTab(num: number) {
    this.tabNumber = num;
  }
  
  isSelected(num: number) {
    return this.tabNumber === i;
  }
}
```
[View Example](https://plnkr.co/edit/zSAFw16MBCHE1Nh8lrDA?p=preview)
