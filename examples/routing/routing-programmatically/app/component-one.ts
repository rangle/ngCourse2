import {Component} from 'angular2/core';
import {Router} from 'angular2/router'
@Component({
  selector: 'component-one',
  template: `Component One<br/>
  <button (click)="onClick()">Click Me</button>
  `
})
export default class ComponentOne { 
  constructor(private _router:Router) { 
     
  }
  onClick () {
    this._router.navigate(['/ComponentThree',{message: 'Called from _router.Navigate'}]);
  }
}