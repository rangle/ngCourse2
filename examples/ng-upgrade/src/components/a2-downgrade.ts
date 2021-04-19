import { Component } from "angular2/core";

@Component({
  selector: "a2-downgrade",
  template: "<p>{{ message }}</p>",
})
export class A2DowngradeComponent {
  message = `I am an Angular component running in AngularJS`;
}
