import { Component } from "angular2/core";

@Component({
  selector: "a2-transclusion-contents",
  template: `<p>{{ message }}</p>`,
})
export class A2Transclusion {
  message = 'I am an Angular Component "transcluded" into AngularJS';
}
