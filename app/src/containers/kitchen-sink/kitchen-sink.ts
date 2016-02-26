import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Container, Sample, NGC_ICONS, CARD_COMPONENTS} from '../../components';
const TEMPLATE = require('./kitchen-sink.html');


@Component({
  selector: 'kitchen-sink',
  template: TEMPLATE,
  directives: [Container, Sample, NGC_ICONS, CARD_COMPONENTS]

})
export default class KitchenSink implements OnInit, OnDestroy {
  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
