import { Component, Input } from "angular2/core";

@Component({
  selector: "a2-projection",
  template: `
    <p>
      Angular Outer Component (Top)
      <ng-content></ng-content>
      Angular Outer Component (Bottom)
    </p>
  `,
})
export class A2Projection {}
