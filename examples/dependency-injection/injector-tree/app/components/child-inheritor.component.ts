import { Component, Inject } from '@angular/core';
import { Unique } from '../services/unique';

@Component({
  selector: 'app-child-inheritor',
  template: `<span>{{ value }}</span>`
})
export class ChildInheritorComponent {
  value = this.u.value;
  
  constructor(private u: Unique) { }
}
