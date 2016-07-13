import {Component} from '@angular/core';

@Component({
  selector: 'component-one',
  template: 'Component One'
})
export default class ComponentOne { 
  console.log(window.location)
}