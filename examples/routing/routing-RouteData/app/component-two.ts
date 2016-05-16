import {Component} from '@angular/core';
import {RouteParams, RouteData} from '@angular/router-deprecated';
@Component({
  selector: 'component-two',
  template: `Component two:
  <p>Message: {{message}}</p>
  <p>Data: {{data}}</p>`
  
})
export default class ComponentTwo { 
  public message:string;
  public data:string;
  
  constructor(private routeParams: RouteParams, private routeData: RouteData) {
    this.message = this.routeParams.get('message');
    this.data = this.routeData.get('passedData')
  }
}