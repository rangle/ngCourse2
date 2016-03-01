import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
@Component({
  selector: 'place-holder',
  template: 'TODO: Complete',
})
class PlaceHolder {

}
@Component({
  selector: 'ngc-main',
  template: 'TBC'
})
@RouteConfig([{
  path: '/',
  name: 'TaskSummary',
  component: PlaceHolder,
  useAsDefault: true
}, {
    path: '/add',
    name: 'TaskAdd',
    component: PlaceHolder
  }, {
    path: '/:id',
    name: 'TaskEdit',
    component: PlaceHolder
  }])
export default class Tasks implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  

  constructor( ) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
  }


  mapStateToThis(state) {
    
  }

  editTask(taskId) {

    
  }

  mapDispatchToThis(dispatch) {
    return {
      
    }
  }
}
