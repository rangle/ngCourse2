import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: '<p>Total price of product is {{ price | currency: "CAD": true: "1.2-4" }}</p>'
})
export class AppComponent {
  price = 100.123456;
}