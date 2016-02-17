import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
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