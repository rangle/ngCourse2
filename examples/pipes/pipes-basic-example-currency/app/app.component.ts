import {Component} from 'angular2/core';

@Component({
	selector: 'product-price',
	template: '<p>Total price of product is {{ price | currency}}</p>'
})
export class ProductPrice {
  price: number = 100.1234;
}