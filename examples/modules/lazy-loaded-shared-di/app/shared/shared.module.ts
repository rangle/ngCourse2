import { NgModule, ModuleWithProviders } from '@angular/core';
import { CounterService } from './counter.service';

@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [CounterService]
    };
  }
}
