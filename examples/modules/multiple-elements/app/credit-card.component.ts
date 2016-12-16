import { Component, OnInit } from '@angular/core';
import { CreditCardService } from './credit-card.service';

@Component({
  selector: 'app-credit-card',
  template: `
    <p>Your credit card is: {{ creditCardNumber | creditCardMask }}</p>
  `
})
export class CreditCardComponent implements OnInit {
  creditCardNumber: string;

  constructor(private creditCardService: CreditCardService) {}

  ngOnInit() {
    this.creditCardNumber = this.creditCardService.getCreditCard();
  }
}