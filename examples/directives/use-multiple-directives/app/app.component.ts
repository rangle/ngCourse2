import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="tabs-selection">
      <app-tab
        *ngFor="let tab of tabs; let i = index"
        [active]="isSelected(i)"
        (click)="setTab(i)">

        {{ tab.title }}
      </app-tab>
    </div>

    <div [ngSwitch]="tabNumber">
      <template ngFor [ngForOf]="tabs" let-tab let-i="index">
        <app-tab-content *ngSwitchCase="i">
          {{tab.content}}
        </app-tab-content>
      </template>
      <app-tab-content *ngSwitchDefault>Select a tab</app-tab-content>
    </div>
  `,
  styles: [`
    :host {
      font-family: Arial;
    }

    .tabs-selection {
      background-color: #ddd;
      display: flex;
      box-sizing: border-box;
      flex-direction: row;
      padding-left: 16px;
      padding-right: 16px;
      width: 100%;
    }
  `]
})
export class AppComponent {
  tabNumber = -1;
  
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