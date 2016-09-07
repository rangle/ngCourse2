import { Component, Inject } from '@angular/core';
import { Unique } from '../services/unique';

@Component({
  selector: 'child-inheritor',
  template: `<span>{{ value }}</span>`
})
export class ChildInheritor {
  value: number;
  constructor(u: Unique) {
    this.value = u.value;
  }
}
