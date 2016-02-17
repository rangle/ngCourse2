import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

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