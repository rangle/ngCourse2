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
  pipes: [OwnersPipe, OwnerTasksPipe, SizePipe],
  directives: [SummaryIcon, TaskFilters],
  template: `
  <p class="h3 mb2 p2">
    <ngc-icon-summary></ngc-icon-summary>
    Hello, Alice Beeblebrox. You own 
    <span class="blue">
      {{ tasks | ownerTasks:'alice' | size }}
    </span>
    out of 
    <span class="orange">{{ tasks.size }}</span>
    tasks.
  </p>
  <ngc-task-filters
    [tasks]="tasks"
    [owner]="owner"
    [taskStatus]="taskStatus"
    [selectOwner]="selectOwner"
    [selectStatus]="selectStatus">
  </ngc-task-filters>
  `
})
export default class Summary implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  tasks: List<TaskMap>;
  owner: string;
  taskStatus: string;
  selectOwner: Function;
  selectStatus: Function;

  constructor( @Inject('ngRedux') private ngRedux ) {}

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis, 
      this.mapDispatchToThis
    )(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      tasks: state.tasks,
      owner: state.filters.get('owner'),
      taskStatus: state.filters.get('taskStatus')
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(FilterActions, dispatch);
  }
}
