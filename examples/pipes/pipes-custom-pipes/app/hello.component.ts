import {Component} from '@angular/core';

@Component({
	selector: 'hello',
	template: `
	  <div>
	    <p>{{ message | length:true }}</p>
	    <p>{{ message | length:false }}</p>
    </div>`
})
export class Hello {
  message: string = 'Hello There';
}
