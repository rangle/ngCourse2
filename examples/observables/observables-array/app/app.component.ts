import {Component, ChangeDetectorRef} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

@Component({
	selector: 'app',
	template: `
	  <b>Angular 2 HTTP requests using RxJs Observables!</b>
	  
	  <div><code>{{doctors.toString()}}</code></div>
	  `
})

export class MyApp {
  private doctors = [];
  
  constructor(http: Http, cd: ChangeDetectorRef) {
    http.get('http://jsonplaceholder.typicode.com/users/')
        .flatMap((data) => data.json())
        .filter((person) => person.id > 5)
        .map((person) => "Dr. " + person.name)
        .subscribe((data) => {
          this.doctors.push(data);
          
          cd.detectChanges();
        });
  }
}