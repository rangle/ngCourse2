import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/concat';

@Component({
  selector: 'app-root',
  template: `
    <p>Total price of product is {{fetchPrice | async | currency:"CAD":true:"1.2-2"}}</p>
    <p>Seconds: {{seconds | async}} </p>
  `
})
export class AppComponent {
  fetchPrice = new Promise((resolve, reject) => {
    setTimeout(() => resolve(10), 500);
  });
  
  seconds = Observable.of(0).concat(Observable.interval(1000))
}
