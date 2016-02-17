import {Component} from 'angular2/core';
@Component({
  selector: 'component-one',
  template: 'Component One'
})
export default class ComponentOne { 
  console.log(window.location)
}