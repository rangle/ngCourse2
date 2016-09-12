import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'product-price',
  template: `
    <p>Total price of product is {{fetchPrice | async | currency:"CAD":true:"1.2-2"}}</p>
    <p>Seconds: {{seconds | async}} </p>
  `
})
export class ProductPrice {
  count: number = 0;

  fetchPrice: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => resolve(10), 500);
  });
  
  seconds: any = new Observable(observer => {
    setInterval(() => { observer.next(this.count++); }, 1000);
  });
}
