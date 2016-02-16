import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
	selector: 'app-root',
	template: `
	  <b>Angular 2 HTTP requests using RxJs Observables!</b>
	  
	  <div><code>{{response}}</code></div>
	  `
})

export class AppComponent {
  constructor(http: Http) {
    http.get('http://jsonplaceholder.typicode.com/posts/1').subscribe((data) => {
      this.response = data._body;
    })
  }
}