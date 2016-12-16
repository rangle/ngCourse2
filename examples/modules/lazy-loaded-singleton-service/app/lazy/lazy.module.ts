import { NgModule } from '@angular/core';

import { LazyComponent }   from './lazy.component';
import { CounterService } from './counter.service';
import { routing } from './lazy.routing';

@NgModule({
  imports: [routing],
  declarations: [LazyComponent],
  providers: [CounterService]
})
export class LazyModule {}
