import { Component, Inject } from '@angular/core';
import { Unique } from '../services/unique';

@Component({
  selector: 'child-own-injector',
  template: `<span>{{ value }}</span>`,
  providers: [Unique]
})
export class ChildOwnInjector {
  value: number;
  constructor(u: Unique) {
    this.value = u.value;
  }
}
