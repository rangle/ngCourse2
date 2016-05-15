import {Component} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

@Component({
  selector: 'component-three',
  template: 'Component three: {{fromRouteParam}}'
})
export default class ComponentThree { 
  fromRouteParam: string;
  constructor(params: RouteParams) {
    this.fromRouteParam = params.get('message');
  }
}