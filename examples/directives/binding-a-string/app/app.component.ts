import {Component, ViewEncapsulation} from '@angular/core';
import {ClassAsStringComponent} from './class-as-string.component';
import {ClassAsArrayComponent} from './class-as-array.component';
import {ClassAsObjectComponent} from './class-as-object.component';

@Component({
  selector: 'app',
  template: `
    <class-as-string>Class as string</class-as-string>
    <class-as-array>Class as array</class-as-array>
    <class-as-object>Class as object</class-as-object>
  `
})
export class AppComponent {
  
}