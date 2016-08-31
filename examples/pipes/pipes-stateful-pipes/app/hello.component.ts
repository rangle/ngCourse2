import {Component} from '@angular/core';

@Component({
	selector: 'hello',
	template: `
  	<div>
      <ul>
          <li>{{ 1 | delay }}</li>
          <li>{{ 3 | delay }}</li>
          <li>{{ 2 | delay }}</li>
          <li>{{ 4 | delay }}</li>
       </ul>
    </div>`
})
export class Hello {

}
