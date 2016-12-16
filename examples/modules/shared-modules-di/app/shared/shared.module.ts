import { NgModule } from '@angular/core';
import { CounterService } from './counter.service';

@NgModule({
  providers: [CounterService],
})
export class SharedModule {}
