import {Component, Input} from 'angular2/core';

@Component({
	selector: 'app',
	template: `
	  <h4>Syntax 1</h4>
    <ul>
      <li *ngFor="#item of items; #i = index">
        ({{i + 1 }}) {{ item }}
      </li>
	  </ul>
	  
	  <h4>Syntax 2</h4>
	  <ul>
      <li template="ngFor #item of items; #i = index">
        ({{ i + 1 }}) {{ item }}
      </li>
	  </ul>
	  
	  <h4>Syntax 3</h4>
	  <ul>
      <template ngFor #item [ngForOf]="items" #i="index">
        <li>
          ({{ i + 1 }}) {{ item }}
        </li>
      </template>
	  </ul>
	`
})
export class App {
  items: string[];
  
  constructor() {
    this.items = ['Spectacles', 'Giraffe', 'Turtle', 'Shark', 'Lamp', 'Chocolate', 'Beef', 'Drawer', 'Brocolli', 'Tomato', 'Plate', 'Zebra'];
  }
  
}

