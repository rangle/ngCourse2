import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'component-two',
  template: `
    <p>Component Two {{id}}</p>
    <nav>
      <a [routerLink]="['child-one']">Child One</a>
      <a [routerLink]="['child-two']">Child Two</a>
    </nav>
    <span style="color: red;">Component Two's router outlet:</span>
    <div style="border: 1px solid red;">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export default class ComponentTwo {
  private id;

  constructor(private route: ActivatedRoute) {}

  private ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
