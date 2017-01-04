import { Component, Inject } from '@angular/core';
import { Unique } from '../services/unique';

@Component({
  selector: 'app-child-own-injector',
  template: `<span>{{ value }}</span>`,
  providers: [Unique]
})
export class ChildOwnInjectorComponent {
  value = this.u.value;
  
  constructor(private u: Unique) { }
}
