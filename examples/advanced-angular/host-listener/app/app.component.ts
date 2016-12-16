import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p appHighlight>Hover to emphasize p tag</p>
    <div appHighlight>Hover to emphasize div tag</div>
  `
})
export class AppComponent {
}
