import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	  <div>
      This web page has {{ pageViews | animateNumber }} views!
    </div>`
})
export class AppComponent {
  pageViews = 100;
  
  constructor() {
    // simulate polling every 5 seconds
    setInterval(() => {
      this.pageViews += Math.round(Math.random() * 10);
    }, 3000);
  }
}
