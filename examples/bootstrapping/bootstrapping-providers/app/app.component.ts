import { Component, OnInit } from '@angular/core';
import { Greeter } from './greeter.service';
@Component({
  selector: 'app',
  template: '<b>{{greeting}}</b>'
})
export class MyApp implements OnInit {
  public greeting: string = '';
  constructor(private greeter: Greeter) {
  }

  ngOnInit() {
    this.greeting = this.greeter.message;
  }
}
