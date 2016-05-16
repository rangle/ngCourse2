import {Component} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

@Component({
  selector: 'component-two',
  template: 'Component two: {{ message }}'
})
export default class ComponentTwo { 
  public message:string;
  constructor(private routeParams: RouteParams) {
    this.message = this.routeParams.get('message');
  }
}


