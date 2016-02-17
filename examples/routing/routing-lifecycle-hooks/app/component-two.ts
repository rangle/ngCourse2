import {Component} from 'angular2/core';
import {RouteParams, RouteData, CanActivate, CanDeactivate} from 'angular2/router';
@Component({
  selector: 'component-two',
  template: `Component two:
  <p>Message: {{message}}</p>
  <p>Data: {{data}}</p>`
  
})

@CanActivate((next: ComponentInstruction, prev: ComponentInstruction)=>{
  return confirm('are you sure you want to go here?')
})
export default class ComponentTwo implements CanDeactivate { 
  public message:string;
  public data:string;
  
  constructor(private routeParams: RouteParams, private routeData: RouteData) {
    this.message = this.routeParams.get('message');
    this.data = this.routeData.get('passedData')
  }
  
  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    
    return confirm('Are you sure you want to leave?');
  }
}