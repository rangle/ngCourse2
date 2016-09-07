import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'component-two',
  template: `
    <p>Component Two <b><code>ID: {{ id }}</code></b></p>
    <nav>
      <a [routerLink]="['./child-one']">Child One</a>
      <a [routerLink]="['./child-two']">Child Two</a>
    </nav>

    <div style="color: red; margin-top: 1rem;">
      Component Two's router outlet:
    </div>
    <div style="border: 2px solid red; padding: 1rem;">
      <router-outlet></router-outlet>
    </div>
  `
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
