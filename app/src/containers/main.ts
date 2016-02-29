import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import Summary from './summary';

@Component({
  selector: 'ngc-main',

  directives: [RouterOutlet],
  template: `
   TODO: Use ngc-grid to display a list of tasks
  `
})
@RouteConfig([{
  path: '/',
  name: 'TasksList',
  component: Summary,
  useAsDefault: true
}])
export default class Main implements OnDestroy, OnInit {

  

  constructor( 
    @Inject('ngRedux') private ngRedux
    
  ) {}

  ngOnInit() {
   
  }

  ngOnDestroy() {
    
  }

 
}
