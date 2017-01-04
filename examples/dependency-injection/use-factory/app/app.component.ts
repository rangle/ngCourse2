import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `Random: {{ value }}`
})
export class AppComponent {
  value: number;
  
  constructor(@Inject('Random') r) {
    this.value = r;
  }
}
