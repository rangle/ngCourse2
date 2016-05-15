import {Component, ChangeDetectorRef} from '@angular/core';
import {Http} from '@angular/http';

@Component({
	selector: 'app',
	template: `
	  <b>Angular 2 HTTP requests using RxJS Observables!</b>
	  
	  <div><code>{{response}}</code></div>
	  `
})

export class App {
  someData: string;
  
  constructor(http: Http, cd: ChangeDetectorRef) {
    http.get('http://jsonplaceholder.typicode.com/posts/1').subscribe((data) => {
      this.response = data._body;

      cd.detectChanges();
    });
  }
}