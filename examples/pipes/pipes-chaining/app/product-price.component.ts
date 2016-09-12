import {Component} from '@angular/core';

@Component({
	selector: 'product-price',
	template: '<p>Total price of product is {{ price | currency:"CAD":true:"1.2-4" | lowercase }}</p>'
})
export class ProductPrice {
  price: number = 100.123456;
}
