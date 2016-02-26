import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Container, 
  Sample, 
  NGC_ICONS, 
  CARD_COMPONENTS,
  Dropdown,
  Grid,
  Header
} from '../../components';
import {List, fromJS, Map} from 'immutable';

const TEMPLATE = require('./kitchen-sink.html');


@Component({
  selector: 'kitchen-sink',
  template: TEMPLATE,
  directives: [Container, Sample, NGC_ICONS, CARD_COMPONENTS, Dropdown, Grid, Header]

})
export default class KitchenSink implements OnInit, OnDestroy {
  dropDownItems: List<string> = List<string>(['item 1','item 2','item 3']);
  dropDownSelected: string = 'item 2';
  tasks:any =  fromJS([
      {owner: 'Alice', description: 'Task', done: false, _id: '123'},
      {owner: 'Bob', description: 'Done Task', done: true, _id: '123' }
    ]);

  
  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onDeleteTask(task) {
    console.log('Deleting task', task);
  }

  onMarkTask(task) {
    console.log('Marking task', task);
  }

  onUpdateTask(task) {
    console.log('Updating task', task);
  }
}
