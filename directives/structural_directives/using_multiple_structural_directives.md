# Using Multiple Structural Directives

Sometimes we'll want to combine multiple structural directives together, like iterating using `ngFor` but wanting to do an `ngIf` to make sure that the value matches some or multiple conditions. Combining structural directives can lead to unexpected results however, so Angular requires that an element can only be bound to one directive at a time. To apply multiple directives we'll have to either (a) expand the sugared syntax, (b) nest template tags or use the `<ng-content>` tag.

It is important to note, that like the `ng-template` elemement, `ng-container` elements are not rendered to the DOM, but rather their child(ren) are/is. The added benefit of using the `ng-container` element is that it allows you to group sibling elements that should also have the same structural Directive without adding an additional unnecessary parent element that will get rendered to the DOM.


```typescript
@Component({
  selector: 'app-root',
  template: `
    <ng-template ngFor [ngForOf]="[1,2,3,4,5,6]" let-item>
      <div *ngIf="item > 3">
        {{item}}
      </div>
    </ng-template>
    
    
    <div *ngFor="let item of [1,2,3,4,5,6]">
      <div *ngIf="item > 3">
        {{item}}
      </div>
    </div>
    
    <ng-container *ngFor="let item of [1,2,3,4,5,6]">
      <div *ngIf="item > 3">
        {{item}}
      </div>
    </ng-container>
  `
})
```

[View Example](https://plnkr.co/edit/V2nWlGOwIITPrUDksGNG?p=preview)

The previous tabs example can use `ngFor` and `ngSwitch` if the tab title and content is abstracted away into the component class.

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
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
      <ng-template ngFor [ngForOf]="tabs" let-tab let-i="index">
        <tab-content *ngSwitchCase="i">
          {{tab.content}}
        </tab-content>
      </ng-template>
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
    return this.tabNumber === num;
  }
}
```

[View Example](https://plnkr.co/edit/YOT4G4buUZduwvVi8cMA?p=preview)

