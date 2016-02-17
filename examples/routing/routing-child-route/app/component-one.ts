import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';
import ComponentThree from './component-three';

@Component({
  selector: 'component-one',
  template: `Component One

  `
})

export default class ComponentOne { 
  console.log(window.location)
}



