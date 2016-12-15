import { Component } from '@angular/core';

import { ClassAsStringComponent } from './class-as-string.component';
import { ClassAsArrayComponent } from './class-as-array.component';
import { ClassAsObjectComponent } from './class-as-object.component';

@Component({
  selector: 'app-root',
  template: `
    <app-class-as-string>Class as string</app-class-as-string>
    <app-class-as-array>Class as array</app-class-as-array>
    <app-class-as-object>Class as object</app-class-as-object>
  `
})
export class AppComponent {
  
}