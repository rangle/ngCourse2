import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditCardMaskPipe } from './credit-card-mask.pipe';
import { CreditCardService } from './credit-card.service';
import { CreditCardComponent } from './credit-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CreditCardMaskPipe,
    CreditCardComponent
  ],
  exports: [CreditCardComponent]
})
export class CreditCardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CreditCardModule,
      providers: [CreditCardService]
    }
  }
}