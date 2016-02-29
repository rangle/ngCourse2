import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {TaskMap} from '../services/tasks-service';
import SummaryIcon from '../components/icons/summary';
import TaskFilters from '../components/task-filters/task-filters';
import {OwnersPipe, OwnerTasksPipe} from '../pipes/owners';
import {SizePipe} from '../pipes/size';
import * as FilterActions from '../actions/filters';
import {List} from 'immutable';

@Component({
  selector: 'ngc-summary',
  template: `
    TODO: Complete Summary Container
  `
})
export default class Summary  {

  constructor( @Inject('ngRedux') private ngRedux ) {}

  
}
